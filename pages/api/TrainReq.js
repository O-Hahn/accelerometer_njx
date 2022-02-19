export default async function handler(req, res) {
    console.log("TrainReq.handler");
    console.log(req);
    switch (req.method) {
        case 'POST': {
            await sendTrainReq(req, res);
            return;
        }

        default: {
            res.status(405).json({ eror: 'method not supported ' + req.method })
        }

    }

}

async function sendTrainReq(req, res) {
    try {
        console.log("TrainReq.sendTrainReq()");
        let data = JSON.parse(req.body);
        let url = data.url;
        console.log("train req url = " + url);

        let rest = null;
        await fetch(url, {
            method: 'POST',
            body: {
                "input_data": [
                    {
                        "values": [...data.dataObj.dataArray],
                    }
                ],
            },
        }).then(response => response.text()).then(dat => rest = JSON.parse(dat));
        //console.log(rest);


        let result = {
            success: true,
        }
        console.log(result);
        return res.json(result);    
        
    } catch (error) {
        console.log("TrainReq.sendTrainReq() error: " + error);
        return res.json({
            message: new Error(error).message,
            success: false,
        });
    }
}

