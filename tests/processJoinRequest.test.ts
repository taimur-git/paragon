// import { describe } from 'vitest';
import { test, expect } from 'vitest';
import { prisma } from '$lib/server/prisma';

let userId = "7c4Q1RfvQCMOmzm";
const test_cases = [28, 29, 32, 37];

test_cases.forEach(ad_id => {
    test(`process a join request for ad ${ad_id}`, async () => {
            const adId = ad_id;
            let req;
            const checkif_req = await prisma.request.findMany({
                where: { 
                    AND: [
                        {adId: adId},
                        {userId: userId}
                    ]
                },
            })
    
            const checkif_app = await prisma.appointment.findMany({
                where: { 
                    AND: [
                        {adId: adId},
                        {studentId: userId}
                    ]
                },
            })
    
            if(checkif_req.length===0 && checkif_app.length===0){
                req = await prisma.request.create({
                    data: {
                        adId: adId,
                        userId: userId,
                    }
                    
                })
                console.log(req);
                expect(req).toBeDefined(); 
            }
            else{
                expect(req).not.toBeDefined();
            }
    });
});
