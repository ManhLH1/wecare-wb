

const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const app = express();
const port = 8083;
const token = "ziSeCJA0c1tun24zCOkK7_l48Zu-dD5Ejw8J5dELzJFgX05mMwJK5CcR06HYkDj7ggLgE2sonaVzeG9WL9Bs5jw377PHbwah_giOM72Nm7pUiW8eRFVsLDktCJ9JcUflxzSoEM3dWLZk-4WVKTkmGixuO21AlvLVXQfLUI-QhJN_e45nLRcJLP-XMJe9lu5tewrCMsgEkmpaWcXJJSs4TFt8THX7pSmyZDT_4J_2aaEQuaPlDzcYGeZ7O1q0sBiwjDTWI0h-gpZ0kX96VfZg7_Q6CqXojjulzvblLqYSbo7ihovXO9xvBiUSFW9seSPU-gCi8rUKvKB3iIO8Ux3lLysl8NLAhyuqxxOS4oQKtcAmXIn69wha6wEV9tG4hkesW-0iJ1Z1upk4r39jGSZXF__e1nz7_NQ15J-VcX4";
//ngrok http --domain=lemur-open-lion.ngrok-free.app 8080

app.use(bodyParser.json());
app.post('/webhooks', (req, res) => {
    const event = req.body;
    textProcess(event);
    res.status(200).send('Yêu cầu đã được xử lý thành công.');
});

function textProcess(event) {
    const senderId = event.sender.id;
    const messageText = event.message.text;
    const currentTime = new Date(); 
    const formattedTime = `${currentTime.toLocaleDateString()} ${currentTime.toLocaleTimeString()}`;
    console.log(`[${formattedTime}] Người dùng ${senderId} sent text "${messageText}"`);
    // Trả về Promise từ hàm này để xử lý kết quả
    return axios({
        method: "GET",
        url: "https://openapi.zalo.me/v2.0/oa/listrecentchat?data={'offset':0,'count':10}",
        headers: {
            "access_token": `${token}`
        }

    })
        .then(data => {
            //Send data to json table
           postJsonToTableJson(data.data);
            return data.data;
        })
        .catch(error => {
            console.error("Error sending message to Zalo API:", error);
            throw error;
        });
}

function postJsonToTableJson(json) {
    // Trả về Promise từ hàm này để xử lý kết quả
    const requestBody = {
        value: json
    };

    axios({
        method: "POST",
        url: "https://prod-61.southeastasia.logic.azure.com:443/workflows/9dc75a37c8fa4ffc8b0dd7e4d79faf01/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=6WOcTtRm0VUxYM0qsIMxep_T8YLsYGJqYQvitkuWFqE",
        data: requestBody  
    })
        .then(response => {
            //console.log("Response Data " + JSON.stringify(response.data));
            return response.data;
        })
        .catch(error => {
            console.error("Error sending message to Zalo API:", error);
            throw error;
        });
}


// Lắng nghe các yêu cầu trên cổng đã chọn
app.listen(port, () => {
    console.log(`Ứng dụng đang lắng nghe tại http://localhost:${port}`);
});

// tele-lasan-buzar-nuhuh-sakah-konup-kikid-zigul-rasap

// tele-zajir-pobot-favin-tivof-difuh-robif-nivur-zanar

// tele-zigin-salop-gizut-luson-dotad-govuh-kotah-solup