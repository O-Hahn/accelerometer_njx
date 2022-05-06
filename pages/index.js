import { useEffect, useState } from 'react';
import Layout from '../components/Layout'

export default function Home() {

  const [orgId, setOrgId] = useState("wb3i1b");
  const [devType, setDevType] = useState("phone");
  const [devId, setDevId] = useState("phone-web-app");
  const [eventType, setEventType] = useState("motion");
  const [token, setToken] = useState("tjbotibm");
  const [iotUrl, setIotUrl] = useState("");
  const [nodeRedUrl, setNodeRedUrl] = useState("https://node-red-fhbgld-2021-05-14.eu-de.mybluemix.net/score_motion");
  const [sendOrientation, setSendOrientation] = useState(false);
  const [cloudApiKey, setCloudApiKey] = useState('qPSIA1mip2TMdMh3Pq8HLgj-q4SUtkT5b8JcOAYjYep-');
  const [cloudRegion, setCloudRegion] = useState('us-south');
  const [deploymentId, setDeploymentId] = useState("9b0d422f-c99a-4808-a5c2-cbb5b1a4b689");


  useEffect(() => {
    const appStateJson = localStorage.getItem("SensorApp.State");
    
    if (appStateJson) {            
        let stateObj = JSON.parse(appStateJson);
        console.log(stateObj);
        if (stateObj.orgId) {
          setOrgId(stateObj.orgId);
        }
        if (stateObj.devType) {
          setDevType(stateObj.devType);
        }
        if (stateObj.devId) {
          setDevId(stateObj.devId);
        }
        if (stateObj.eventType) {
          setEventType(stateObj.eventType);
        }
        if(stateObj.nodeRedUrl) {
          setNodeRedUrl(stateObj.nodeRedUrl);
        }
        if(stateObj.sendOrientation) {
          setSendOrientation(stateObj.sendOrientation);
        }
        if (stateObj.cloudApiKey) {
          setCloudApiKey(stateObj.cloudApiKey);
        }
        if (stateObj.cloudRegion) {
          setCloudRegion(stateObj.cloudRegion);
        }
        if (stateObj.deploymentId) {
          setDeploymentId(stateObj.deploymentId);
        }
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
      cloudApiKey: cloudApiKey,
      cloudRegion: cloudRegion,
      deploymentId: deploymentId
    }

    localStorage.setItem("SensorApp.State", JSON.stringify(appState));

  //eslint-disable-next-line
  }, [orgId, devType, devId, eventType, token, nodeRedUrl, sendOrientation, cloudApiKey, cloudRegion, deploymentId])

  return (
    <Layout>
        <div className="mb-16 w-full">
          <div className="flex mt-2">
            <div className="w-2/6"></div>
            <div className="font-bold text-lg mt-4">Train settings - Watson IOT Foundation</div>
          </div>
          <div className="flex mt-2 items-center">
              <div className="w-2/6 text-right pr-5 text-gray-600">Organization ID:</div>
              <input 
                    className="w-4/6 rounded border border-gray-100 border-inherit border-2 hover:border-blue-100 mx-px hover:mx-0 hover:border-2 py-2.5 px-2 focus:mx-0 focus:border-2 focus:border-blue-100 focus:outline-0 pr-8"
                    type="search"
                    name="orgid" 
                    value={orgId}
                    onChange={(e) => setOrgId(e.target.value)}
              />
          </div>
          <div className="flex mt-2 items-center">
              <div className="w-2/6 text-right pr-5 text-gray-600">Device type:</div>
              <input 
                    className="w-4/6 rounded border border-gray-100 border-inherit border-2 hover:border-blue-100 mx-px hover:mx-0 hover:border-2 py-2.5 px-2 focus:mx-0 focus:border-2 focus:border-blue-100 focus:outline-0 pr-8"
                    type="search"
                    name="devType" 
                    value={devType}
                    onChange={(e) => setDevType(e.target.value)}
              />
          </div>
          <div className="flex mt-2 items-center">
              <div className="w-2/6 text-right pr-5 text-gray-600">Device ID:</div>
              <input 
                    className="w-4/6 rounded border border-gray-100 border-inherit border-2 hover:border-blue-100 mx-px hover:mx-0 hover:border-2 py-2.5 px-2 focus:mx-0 focus:border-2 focus:border-blue-100 focus:outline-0 pr-8"
                    type="search"
                    name="devId" 
                    value={devId}
                    onChange={(e) => setDevId(e.target.value)}
              />
          </div>
          <div className="flex mt-2 items-center">
              <div className="w-2/6 text-right pr-5 text-gray-600">Event Type:</div>
              <input 
                    className="w-4/6 rounded border border-gray-100 border-inherit border-2 hover:border-blue-100 mx-px hover:mx-0 hover:border-2 py-2.5 px-2 focus:mx-0 focus:border-2 focus:border-blue-100 focus:outline-0 pr-8"
                    type="search"
                    name="eventType" 
                    value={eventType}
                    onChange={(e) => setEventType(e.target.value)}
              />
          </div>
          <div className="flex mt-2 items-center">
              <div className="w-2/6 text-right pr-5 text-gray-600">Device Token:</div>
              <input 
                    className="w-4/6 rounded border border-gray-100 border-inherit border-2 hover:border-blue-100 mx-px hover:mx-0 hover:border-2 py-2.5 px-2 focus:mx-0 focus:border-2 focus:border-blue-100 focus:outline-0 pr-8"
                    type="password"
                    name="token" 
                    value={token}
                    onChange={(e) => setToken(e.target.value)}
              />
          </div>
          <div className="flex mt-2 items-center">
              <div className="w-2/6 text-right pr-5 text-gray-600">IOT URL:</div>
              <div className="w-4/6  text-sm mx-px hover:mx-0 py-2.5 px-2 pr-8 overflow-x-auto">
                {iotUrl}
              </div>  
          </div>

          <div className="flex mt-2">
            <div className="w-2/6"></div>
            <div className="font-bold text-lg mt-4">Scoring settings - Machine Learning</div>
          </div>
          <div className="flex mt-2 items-center">
              <div className="w-2/6 text-right pr-5 text-gray-600">Cloud API Key:</div>
              <input 
                    className="w-4/6 rounded border border-gray-100 border-inherit border-2 hover:border-blue-100 mx-px hover:mx-0 hover:border-2 py-2.5 px-2 focus:mx-0 focus:border-2 focus:border-blue-100 focus:outline-0 pr-8"
                    type="password"
                    name="cloudApiKey" 
                    value={cloudApiKey}
                    onChange={(e) => setCloudApiKey(e.target.value)}
              />
          </div>
          <div className="flex mt-2 items-center">
              <div className="w-2/6 text-right pr-5 text-gray-600">Cloud Region:</div>
              <input 
                    className="w-4/6 rounded border border-gray-100 border-inherit border-2 hover:border-blue-100 mx-px hover:mx-0 hover:border-2 py-2.5 px-2 focus:mx-0 focus:border-2 focus:border-blue-100 focus:outline-0 pr-8"
                    type="search"
                    name="cloudRegion" 
                    value={cloudRegion}
                    onChange={(e) => setCloudRegion(e.target.value)}
              />
          </div>
          <div className="flex mt-2 items-center">
              <div className="w-2/6 text-right pr-5 text-gray-600">Deployment ID:</div>
              <input 
                    className="w-4/6 rounded border border-gray-100 border-inherit border-2 hover:border-blue-100 mx-px hover:mx-0 hover:border-2 py-2.5 px-2 focus:mx-0 focus:border-2 focus:border-blue-100 focus:outline-0 pr-8"
                    type="search"
                    name="deploymentId" 
                    value={deploymentId}
                    onChange={(e) => setDeploymentId(e.target.value)}
              />
          </div>

          <div className="flex mt-2">
            <div className="w-2/6"></div>
            <div className="font-bold text-lg mt-4">General settings</div>
          </div>
          <div className="flex mt-2 items-center">
              <div className="w-2/6 text-right pr-5 text-gray-600">orientation data:</div>
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
