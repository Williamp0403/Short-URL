import { nanoid } from 'nanoid'
import { UAParser } from 'ua-parser-js'
import { sql } from '../config/db.js';

export class ModelLink {
  static async requestGetLinks(id_user) {
    return await sql`
      SELECT id_link, id_user, short_url, long_url, name, clicks, is_active,
        created_at - interval '4 hours' AS created_at FROM Links
      WHERE id_user = ${id_user} AND is_active = TRUE
      ORDER BY created_at DESC
    `;
  }

  static async requestGetLinkStatistics(id_link) {
    const id = Number(id_link)

    if (Number.isNaN(id)) return { success: false, status: 400, message: 'ID inválido' }

    console.log('HOLAA')

    const [link] = await sql`
      WITH total_visits AS (
        SELECT lv.id_link, COUNT(*)::int AS total_visits
        FROM LinkVisits lv
        WHERE lv.id_link = ${id_link}
        GROUP BY lv.id_link
      ),
      browser_stats AS (
        SELECT lv.id_link, lv.browser_name, COUNT(*)::int AS browser_count, 
        ROUND( (COUNT(*) * 100.0 / NULLIF(tv.total_visits, 0)), 2 ) AS browser_percentage
        FROM LinkVisits lv
        JOIN total_visits tv ON tv.id_link = lv.id_link
        WHERE lv.id_link = ${id_link}
        GROUP BY lv.id_link, lv.browser_name, tv.total_visits
      ),
      device_stats AS (
        SELECT lv.id_link, lv.device_type, COUNT(*)::int AS device_count,
        ROUND( (COUNT(*) * 100.0 / NULLIF(tv.total_visits, 0)), 2 ) AS device_percentage
        FROM LinkVisits lv
        JOIN total_visits tv ON tv.id_link = lv.id_link
        WHERE lv.id_link = ${id_link}
        GROUP BY lv.id_link, lv.device_type, tv.total_visits
      ),
      ordered_browsers AS (
        SELECT DISTINCT ON (browser_name)
          browser_name, browser_count, browser_percentage
        FROM browser_stats
        ORDER BY browser_name, browser_count DESC
      ),
      ordered_devices AS (
        SELECT DISTINCT ON (device_type)
          device_type, device_count, device_percentage
        FROM device_stats
        ORDER BY device_type, device_count DESC
      )
      SELECT 
        l.id_link, l.short_url, l.name, l.long_url, 
        (l.created_at - interval '4 hours') AS created_at, 
        l.clicks,
        COALESCE(
          (SELECT json_agg(ob ORDER BY ob.browser_count DESC)
            FROM ordered_browsers ob),
          '[]'
        ) AS browsers,
        COALESCE(
          (SELECT json_agg(od ORDER BY od.device_count DESC)
            FROM ordered_devices od),
          '[]'
        ) AS devices
      FROM Links l
      WHERE l.id_link = ${id_link}
      GROUP BY l.id_link, l.short_url, l.name, l.long_url, l.created_at, l.clicks;
      `;

    if (!link) return { success: false, status: 404, message: 'EL enlace no existe.' }

    return { success: true, link }
  }

  static async requestCreateLink(data, id_user) {
    const { name, long_url } = data
    const shortCode = nanoid(6)

    const hasShortCode = await sql`SELECT * FROM Links WHERE short_url = ${shortCode}`

    if (hasShortCode.length > 0) return { success: false, status: 409, message: 'Código ya existe.' }

    const [short_url] = await sql`
      INSERT INTO Links (short_url, long_url, name, id_user) 
      VALUES (${shortCode}, ${long_url}, ${name || null}, ${id_user}) 
      RETURNING *, created_at - INTERVAL '4 hours' AS created_at`

    return {
      success: true,
      message: 'Link creado exitosamente.',
      link: short_url
    }
  }

  static async requestDeleteLink(id_link) {
    const [link] = await sql`UPDATE Links SET is_active = false WHERE id_link = ${id_link} RETURNING *`

    if (!link) return { success: false, message: 'EL enlace no existe.' }

    return {
      success: true,
      id_link: link.id_link
    }
  }

  static async requestRedirectLink(code, req) {
    const [hasCode] = await sql`SELECT * FROM Links WHERE short_url = ${code} AND is_active = TRUE`

    if (!hasCode) return { success: false, status: 404, message: 'EL link no existe.' }

    const parser = new UAParser(req.get('user-agent') || '')
    const uaResult = parser.getResult()

    const browserName = uaResult.browser?.name || 'Desconocido'
    const deviceType = uaResult.device?.type || 'desktop'

    await sql`
        INSERT INTO LinkVisits (id_link, browser_name, device_type)
        VALUES (${hasCode.id_link}, ${browserName}, ${deviceType})
      `

    return {
      success: true,
      link: hasCode.long_url
    }
  }

  static async requestDashboardSummary(id_user) {
    const [totals] = await sql`
      SELECT COUNT(*) AS total_links, COALESCE(SUM(clicks), 0) AS total_clicks 
      FROM Links WHERE id_user = ${id_user} AND is_active = TRUE`;

    const top3 = await sql`
      SELECT short_url, clicks FROM Links WHERE id_user = ${id_user} AND is_active = TRUE
      ORDER BY clicks DESC LIMIT 3`

    const mostPopular = top3[0]

    const clicksLast7Days = await sql`
      WITH dias AS (
          SELECT generate_series(
            (now() AT TIME ZONE 'America/Caracas')::date - INTERVAL '6 days',
            (now() AT TIME ZONE 'America/Caracas')::date,
            '1 day'
          )::date AS dia_local
        ),
        visitas_local AS (
          SELECT 
            (v.visited_at AT TIME ZONE 'America/Caracas')::date AS dia_local,
            COUNT(*)::int AS clicks 
          FROM LinkVisits v 
          JOIN Links l ON l.id_link = v.id_link
          WHERE l.id_user = ${id_user} 
            AND l.is_active = TRUE
          GROUP BY dia_local
        )
        SELECT 
          to_char(d.dia_local, 'YYYY-MM-DD') AS day, 
          COALESCE(v.clicks, 0) AS clicks
        FROM dias d 
        LEFT JOIN visitas_local v 
          ON d.dia_local = v.dia_local
        ORDER BY d.dia_local;`

    return {
      total_links: Number(totals.total_links),
      total_clicks: Number(totals.total_clicks),
      most_popular: mostPopular || null,
      top3,
      clicks_last_7_days: clicksLast7Days
    }
  }

  static async requestGetDashboardTechSummary(id_user) {
    const [stats] = await sql`
      WITH active_links AS (
        SELECT id_link FROM Links WHERE id_user = ${id_user} AND is_active = TRUE
      ),
      user_visits AS (
        SELECT * 
        FROM LinkVisits 
        WHERE id_link IN (SELECT id_link FROM active_links)
      ),
      total_visits AS (
        SELECT COUNT(*)::int AS total FROM user_visits
      ),
      browser_stats AS (
        SELECT 
          browser_name,
          COUNT(*)::int AS browser_count,
          ROUND(COUNT(*) * 100.0 / NULLIF((SELECT total FROM total_visits), 0), 2) AS browser_percentage
        FROM user_visits
        GROUP BY browser_name
        ORDER BY browser_count DESC
      ),
      device_stats AS (
        SELECT 
          device_type,
          COUNT(*)::int AS device_count,
          ROUND(COUNT(*) * 100.0 / NULLIF((SELECT total FROM total_visits), 0), 2) AS device_percentage
        FROM user_visits
        GROUP BY device_type
        ORDER BY device_count DESC
      )
      SELECT 
      COALESCE((SELECT json_agg(browser_stats) FROM browser_stats), '[]'::json) AS browsers,
      COALESCE((SELECT json_agg(device_stats) FROM device_stats), '[]'::json) AS devices;`;

    return stats;
  }
}