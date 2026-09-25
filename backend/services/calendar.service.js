import { google } from 'googleapis';
import { getAuthClient } from '../utils/googleAuth.js';

/**
 * Inserts a new appointment event into Google Calendar.
 *
 * @param {object} bookingData
 * @param {string} bookingData.clientName
 * @param {string} bookingData.clientEmail
 * @param {string} bookingData.clientPhone
 * @param {string} bookingData.clientAddress
 * @param {string} bookingData.serviceName
 * @param {string} bookingData.date        - YYYY-MM-DD
 * @param {string} bookingData.time        - HH:MM (24h)
 */
export const createCalendarEvent = async ({ clientName, clientEmail, clientPhone, clientAddress, serviceName, date, time }) => {
    if (process.env.DISABLE_CALENDAR === 'true') {
        console.log(`📧 Create Calender skipped`);
        return;
    }
    const authClient = await getAuthClient();
    const calendar = google.calendar({ version: 'v3', auth: authClient });

    const startDateTime = `${date}T${time}:00`;
    const [h, m] = time.split(':').map(Number);
    const endDateTime = `${date}T${String(h + 1).padStart(2, '0')}:${String(m).padStart(2, '0')}:00`;

    await calendar.events.insert({
        calendarId: process.env.GOOGLE_CALENDAR_ID,
        requestBody: {
            summary: `Appointment: ${serviceName} - ${clientName}`,
            location: clientAddress,
            description: `Service: ${serviceName}\nClient: ${clientName}\nPhone: ${clientPhone}\nEmail: ${clientEmail}`,
            start: { dateTime: startDateTime, timeZone: 'America/Los_Angeles' },
            end:   { dateTime: endDateTime,   timeZone: 'America/Los_Angeles' },
        },
    });

    console.log(`✅ Google Calendar event created for ${clientName}.`);
};
