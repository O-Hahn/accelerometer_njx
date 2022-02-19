import Image from "next/image";
import { useEffect, useState } from "react";
import Layout from "../components/Layout";

const Train = () => {

    const [recording, setRecording] = useState(false);
    const [motionset, setMotionset] = useState("");
    const [key, setKey] = useState("");   
    const [nodeRedUrl, setNodeRedUrl] = useState("https://node-red-fhbgld-2021-05-14.eu-de.mybluemix.net/train_motion");
    const [delay, setDelay] = useState(100);
    const [dataObj, setDataObj] = useState({dataArray: []});
    const [sendOrientation, setSendOrientation] = useState(true);

    const handleAcceleration = (event) => {
        console.log("Handle acceleration")
//        console.log(event);
        let now = new Date();
        if(recording) {
            var data = {
                device: "phone_1",
                figure: key,
                motionset: motionset,
                date: now.toISOString(),
                timestamp: now.getTime(),
                acceleration: {
                    x: event.acceleration.x,
                    y: event.acceleration.y,
                    z: event.acceleration.z
                },
            };
            console.log("length: " + dataObj.dataArray.length);
            let len = dataObj.dataArray.length;
            if (len > 0) {
                console.log("last " + dataObj.dataArray[len - 1].timestamp);
                let timeDiff = now - dataObj.dataArray[len - 1].timestamp;
                if (timeDiff > delay) {
                    setDataObj({ dataArray: [...dataObj.dataArray, data]});
                }
            } else {
                setDataObj({ dataArray: [...dataObj.dataArray, data]});
            }
        }
    }

    const handleOrientation = (event) => {
        console.log("handle orientation");
        //console.log(event);
        //console.log(recording);
        let now = new Date();
        if(recording) {
            var data = {
                device: "phone_1",
                figure: key,
                motionset: motionset,
                date: now.toISOString(),
                timestamp: now.getTime(),
                orientation: {
                    alpha: event.alpha,
                    beta: event.beta,
                    gamma: event.gamma
                },
            };
            console.log("length: " + dataObj.dataArray.length);
            let len = dataObj.dataArray.length;
            if (len > 0) {
                console.log("last " + dataObj.dataArray[len - 1].timestamp);
                let timeDiff = now - dataObj.dataArray[len - 1].timestamp;
                if (timeDiff > delay) {
                    setDataObj({ dataArray: [...dataObj.dataArray, data]});
                }
            } else {
                setDataObj({ dataArray: [...dataObj.dataArray, data]});
            }
        }
    }

    const handleStart = () => {
        console.log("Start");
        let now = new Date();
        setMotionset(now.toISOString());
        setRecording(true);
        setDataObj({dataArray: []});
    };

    const handleStop = () => {
        console.log("Stop");
        setRecording(false);
    };

    const handleNumber = (k) => {
        console.log(k);
        setKey(k);
    };
    
    const handleSend = async () => {
        console.log("Send");
        let req = {
            url: nodeRedUrl,
            dataObj: dataObj,
        }
        let response = await fetch('/api/TrainReq', {
            method: 'POST',
            body: JSON.stringify(req),
        });

    };

    useEffect(() => {
        console.log("Use effect");
        if ( typeof( DeviceMotionEvent ) !== "undefined" && typeof( DeviceMotionEvent.requestPermission ) === "function" ) {
            DeviceMotionEvent.requestPermission().then(response => {
                if (response === 'granted') {
                    console.log("accelerometer permission granted");
                    // Do stuff here
                }
            });  
        }
        window.addEventListener('devicemotion', handleAcceleration);
        if (sendOrientation) {
            window.addEventListener('deviceorientation', handleOrientation);
        }
        return () => {
            window.removeEventListener('devicemotion', handleAcceleration);
            if (sendOrientation) {
                window.removeEventListener('deviceorientation', handleOrientation);
            }
        };
        // eslint-disable-next-line
    }, [recording, dataObj]);


    return (
        <Layout  >
        <h1 className="text-lg font-bold mt-4 border-b-2">Training</h1>
        <div className="mt-4 w-full">
            <div className="flex">
                <div className="w-1/6 text-right pr-5 text-gray-600">Node Red URL:</div>
                <div className="w-5/6 font-medium">{nodeRedUrl}</div>
            </div>

            <div className="flex mt-2 items-center">
                <div className="w-1/6 text-right pr-5 text-gray-600">Delay:</div>
                <input 
                    className=" rounded border border-gray-100 border-inherit border-2 hover:border-blue-100 mx-px hover:mx-0 hover:border-2 py-2.5 px-2 focus:mx-0 focus:border-2 focus:border-blue-100 focus:outline-0 pr-8"
                    type="text"
                    name="delay" 
                    placeholder="delay in ms"
                    value={delay}
                    onChange={e => {setDelay(e.target.value)}}
                />

            </div>

            <div className="flex mt-2 items-center">
                <div className="w-1/6 text-right pr-5 text-gray-600">Figure:</div>
                <input 
                    className=" rounded border border-gray-100 border-inherit border-2 hover:border-blue-100 mx-px hover:mx-0 hover:border-2 py-2.5 px-2 focus:mx-0 focus:border-2 focus:border-blue-100 focus:outline-0 pr-8"
                    type="text"
                    name="delay" 
                    placeholder="figure"
                    value={key}
                    onChange={e => {setKey(e.target.value)}}
                />

            </div>
            {recording ? (
                <div className="flex mt-2">
                    <div className="w-1/6"></div>
                    <button 
                        className="bg-indigo-500 hover:bg-indigo-800 text-white font-bold py-2 px-4 rounded inline-flex items-center w-32"
                        onClick={handleStop}
                    >
                        <Image className="filter-white" src="/Stop.svg" width="30" height="30" alt="Start" />
                        <span className="ml-4">STOP</span>
                    </button>
                </div>           
            ) : (
                <div className="flex mt-2">
                    <div className="w-1/6"></div>
                    <button 
                        className="bg-indigo-500 hover:bg-indigo-800 text-white font-bold py-2 px-4 rounded inline-flex items-center w-32"
                        onClick={handleStart}
                    >
                        <Image className="filter-white" src="/Play.svg" width="30" height="30" alt="Start" />
                        <span className="ml-4">START</span>
                    </button>
                </div>           
            )}
            <div className="flex mt-2">
                <div className="w-1/6"></div>
                <button 
                    className="bg-indigo-500 hover:bg-indigo-800 text-white font-bold py-2 px-4 rounded inline-flex items-center w-32"
                    onClick={handleSend}
                >
                    <Image className="filter-white" src="/Send.svg" width="30" height="30" alt="Start" />
                    <span className="ml-4">SEND</span>
                </button>
            </div>           

            {dataObj && (
                <div>
                    <div className="flex mt-2">
                        <div className="w-1/6 text-right pr-5 text-gray-600">Nr. of events:</div>
                        <div className="w-5/6 font-medium">{dataObj.dataArray.length}</div>
                    </div>
                    <div className="flex mt-2">
                        <div className="w-1/6 text-right pr-5 text-gray-600">Data:</div>
                        <pre className="w-5/6 border m-2 p-2 h-96 overflow-scroll text-xs">
                            {JSON.stringify(dataObj, null, 2) }
                        </pre>
                    </div>
                </div>
            )}

        </div>
    </Layout >
    );
}

export default Train;