import { useEffect, useState } from 'react';
import Layout from '../components/Layout'

export default function Home() {

  const [orgId, setOrgId] = useState("ygbety");
  const [devType, setDevType] = useState("Raspy");
  const [devId, setDevId] = useState("raspi-sim");
  const [eventType, setEventType] = useState("motion");
  const [token, setToken] = useState("tjbotsim");
  const [iotUrl, setIotUrl] = useState("");
  const [nodeRedUrl, setNodeRedUrl] = useState("https://node-red-fhbgld-2021-05-14.eu-de.mybluemix.net/score_motion");
  const [sendOrientation, setSendOrientation] = useState(false);


  useEffect(() => {
    const appStateJson = localStorage.getItem("SensorApp.State");
    
    if (appStateJson) {            
        let stateObj = JSON.parse(appStateJson);
        console.log(stateObj);
        setOrgId(stateObj.orgId);
        setDevType(stateObj.devType);
        setDevId(stateObj.devId);
        setEventType(stateObj.eventType);
        setNodeRedUrl(stateObj.nodeRedUrl);
        setSendOrientation(stateObj.sendOrientation);
    }

  //eslint-disable-next-line
  }, [])

  useEffect(() => {

    let url =  "https://" + orgId + ".messaging.internetofthings.ibmcloud.com/api/v0002/device/types/" + devType + "/devices/" + devId + "/events/" + eventType;
    setIotUrl(url);
    
    let appState = {
      orgId: orgId,
      devType: devType,
      devId: devId,
      eventType: eventType,
      iotUrl: url,
      iotToken: token,
      nodeRedUrl: nodeRedUrl,
      sendOrientation: sendOrientation,
    }

    localStorage.setItem("SensorApp.State", JSON.stringify(appState));

  //eslint-disable-next-line
  }, [orgId, devType, devId, eventType, token, nodeRedUrl, sendOrientation])

  return (
    <Layout>
        <div className="mb-16 w-full">
          <div className="flex mt-2">
            <div className="w-1/6"></div>
            <div className="ml-7 font-bold text-lg mt-4 w-full">Train settings - Watson IOT Foundation</div>
          </div>
          <div className="flex mt-2 items-center">
              <div className="w-1/6 text-right pr-5 text-gray-600">Organization ID:</div>
              <input 
                    className="w-3/6 rounded border border-gray-100 border-inherit border-2 hover:border-blue-100 mx-px hover:mx-0 hover:border-2 py-2.5 px-2 focus:mx-0 focus:border-2 focus:border-blue-100 focus:outline-0 pr-8"
                    type="search"
                    name="orgid" 
                    value={orgId}
                    onChange={(e) => setOrgId(e.target.value)}
              />
          </div>
          <div className="flex mt-2 items-center">
              <div className="w-1/6 text-right pr-5 text-gray-600">Device type:</div>
              <input 
                    className="w-3/6 rounded border border-gray-100 border-inherit border-2 hover:border-blue-100 mx-px hover:mx-0 hover:border-2 py-2.5 px-2 focus:mx-0 focus:border-2 focus:border-blue-100 focus:outline-0 pr-8"
                    type="search"
                    name="devType" 
                    value={devType}
                    onChange={(e) => setDevType(e.target.value)}
              />
          </div>
          <div className="flex mt-2 items-center">
              <div className="w-1/6 text-right pr-5 text-gray-600">Device ID:</div>
              <input 
                    className="w-3/6 rounded border border-gray-100 border-inherit border-2 hover:border-blue-100 mx-px hover:mx-0 hover:border-2 py-2.5 px-2 focus:mx-0 focus:border-2 focus:border-blue-100 focus:outline-0 pr-8"
                    type="search"
                    name="devId" 
                    value={devId}
                    onChange={(e) => setDevId(e.target.value)}
              />
          </div>
          <div className="flex mt-2 items-center">
              <div className="w-1/6 text-right pr-5 text-gray-600">Event Type:</div>
              <input 
                    className="w-3/6 rounded border border-gray-100 border-inherit border-2 hover:border-blue-100 mx-px hover:mx-0 hover:border-2 py-2.5 px-2 focus:mx-0 focus:border-2 focus:border-blue-100 focus:outline-0 pr-8"
                    type="search"
                    name="eventType" 
                    value={eventType}
                    onChange={(e) => setEventType(e.target.value)}
              />
          </div>
          <div className="flex mt-2 items-center">
              <div className="w-1/6 text-right pr-5 text-gray-600">Device Token:</div>
              <input 
                    className="w-3/6 rounded border border-gray-100 border-inherit border-2 hover:border-blue-100 mx-px hover:mx-0 hover:border-2 py-2.5 px-2 focus:mx-0 focus:border-2 focus:border-blue-100 focus:outline-0 pr-8"
                    type="password"
                    name="token" 
                    value={token}
                    onChange={(e) => setToken(e.target.value)}
              />
          </div>
          <div className="flex mt-2 items-center">
              <div className="w-1/6 text-right pr-5 text-gray-600">IOT URL:</div>
              <div className="w-3/6  text-sm mx-px hover:mx-0 py-2.5 px-2 pr-8">
                {iotUrl}
              </div>  
          </div>

          <div className="flex mt-2">
            <div className="w-1/6"></div>
            <div className="ml-7 font-bold text-lg mt-4 w-full">Scoring settings - Node Red</div>
          </div>
          <div className="flex mt-2 items-center">
              <div className="w-1/6 text-right pr-5 text-gray-600">Node Red URL:</div>
              <input 
                    className="w-3/6 rounded border border-gray-100 border-inherit border-2 hover:border-blue-100 mx-px hover:mx-0 hover:border-2 py-2.5 px-2 focus:mx-0 focus:border-2 focus:border-blue-100 focus:outline-0 pr-8"
                    type="search"
                    name="nodeRedUrl" 
                    value={nodeRedUrl}
                    onChange={(e) => setNodeRedUrl(e.target.value)}
              />
          </div>

          <div className="flex mt-2">
            <div className="w-1/6"></div>
            <div className="ml-7 font-bold text-lg mt-4 w-full">General settings</div>
          </div>
          <div className="flex mt-2 items-center">
              <div className="w-1/6 text-right pr-5 text-gray-600">orientation data:</div>
                <input 
                  type="checkbox" 
                  className="w-6 h-6"
                  name="sendOrientation" 
                  checked={sendOrientation}
                  onChange={(e) => setSendOrientation(e.target.checked)}
              />
          </div>

        </div>
    </Layout >
  )
}
