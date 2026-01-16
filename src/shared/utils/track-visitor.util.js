import geoip from 'geoip-lite';
import { UserAgent } from 'express-useragent';
export const trackVisitor = (req) => {
    const ip = req.ip || req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    const ipAddress = Array.isArray(ip) ? ip[0] : ip;
    const source = req.headers['user-agent'] ?? 'unknown';
    const parser = new UserAgent().hydrate(source);
    const agent = parser.Agent;
    let deviceType = 'Desktop';
    if (agent.isMobile)
        deviceType = 'Mobile';
    else if (agent.isTablet)
        deviceType = 'Tablet';
    else if (agent.isSmartTV)
        deviceType = 'SmartTV';
    else if (agent.isBot)
        deviceType = 'Bot';
    const geo = geoip.lookup(ipAddress);
    const location = [geo?.city, geo?.country].filter(Boolean).join(', ') || 'unknown';
    return {
        ipAddress,
        deviceType,
        location
    };
};
