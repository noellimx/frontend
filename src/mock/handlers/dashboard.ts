import { rest } from "msw";
import { Endpoints } from "../../types/endpoints";
import { mockCredentials } from "./auth";


export const getHandlers = (serverUrl: string) => {
  return [

    rest.post(`${serverUrl}${Endpoints.youtubeReference.create}`, async (req, res, ctx) => {
      /**
       * curl -H 'Content-type: application/json' 'https://forager.hopto.org/reference/youtube/all'                                  
{"data":[],"message":""}
       */
      const token = req.headers.get("Authorization")

      if (token !== `Bearer ${mockCredentials.token}`) {
        return res(ctx.status(403))
      }


      const form: { sfa_license_no: string; video_id: string, timestamp: string } = await req.json();
      const s = { "video_id": form.video_id, "timestamp": form.timestamp, "food_establishment": { "sfa_license_no": form.sfa_license_no } }
      return res(ctx.status(200), ctx.json(s))
    }),


    rest.get(`${serverUrl}${Endpoints.youtubeReference.all}`, async (req, res, ctx) => {
      /**
       * curl -H 'Content-type: application/json' 'https://forager.hopto.org/reference/youtube/all'                                  
{"data":[],"message":""}
       */
      const token = req.headers.get("Authorization")

      if (token !== `Bearer ${mockCredentials.token}`) {
        return res(ctx.status(403))
      }



      const reference = {
        video_id: "ASvLVu1obqw",
        sfa_license_no: "license123345",
        postal_code: "123456",
        timestamp: "30s"
      }

      const reference2 = {
        video_id: "aSq7pq40sP4",
        sfa_license_no: "license123345",
        postal_code: "123456",
        timestamp: "30s"
      }

      const reference3 = {
        video_id: "BbtuPZYtjXw",
        sfa_license_no: "license123345",
        postal_code: "123456",

        timestamp: "30s"
      }


      const reference4 = {
        video_id: "ASvLVu1obqw",
        sfa_license_no: "license0123",
        postal_code: "123456",

        timestamp: "30s"
      }

      const reference5 = {
        video_id: "aSq7pq40sP4",
        sfa_license_no: "license0123",
        postal_code: "123456",
        timestamp: "30s"
      }

      const reference6 = {
        video_id: "BbtuPZYtjXw",
        sfa_license_no: "license0123",
        postal_code: "123456",
        timestamp: "30s"
      }




      return res(ctx.status(200), ctx.json({ data: [reference4, reference5, reference6, reference, reference2, reference3] }))
    }),
  ];
};
