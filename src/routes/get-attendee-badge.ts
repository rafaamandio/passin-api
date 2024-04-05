import { prisma } from './../lib/prisma';
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { FastifyInstance } from "fastify";
import { z } from "zod";

export async function getAttendeesBadge(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .get(
    "/attendees/:attendeeId/badge",
    {
      schema: {
        params: z.object({
          attendeeId: z.coerce.number().int(),
        }),
        response: {
          200: z.object({
            badge: z.object({
              name: z.string(),
              email: z.string().email(),
              eventTitle: z.string(),
              checkInUrl: z.string().url()
            })
          })
        }
      },
    },
    async (req, res) => {
      const { attendeeId } = req.params;

      const attendee = await prisma.attendee.findUnique({
        select: {
          name: true,
          email: true,
          event: {
            select: {
              title: true,
            },
          },
        },        
        where: {
          id: attendeeId
        }
      })


      if (attendee === null) {
        throw new Error('Attendee not found.')
      }

      const baseURL = `${req.protocol}://${req.hostname}`

      const checkInUrl = new URL(`/attendees/${attendeeId}/check-in`, baseURL)

      return res.send({
        badge: {
          name: attendee.name,
          email: attendee.email,
          eventTitle: attendee.event.title,
          checkInUrl: checkInUrl.toString(),
        }
      })
    }
  );
}
