import { ChangeEvent, FC, useState } from "react";
import ButtonFC from "../../../components/utils/Button";
import axios, { AxiosError } from "axios";
import { globalConfig } from "../../../../initConfig";
import { useAppDispatch, useAppSelector } from "../../../../store";
import { notify } from "../../../../redux/store/slice/notification";
import { Endpoints } from "../../../../types/endpoints";






const youtube_parser = (url: string) => {
    const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[7].length == 11) ? match[7] : "";
}


const Label = ({ text }: { text: string }) => {
    return <label className="block  font-bold md:text-right mb-1 md:mb-0 pr-4" >
        {`${text}`}
    </label>
}

const DivInput: FC<{ divInputId: string, labelText: string, value: string, onValueChange: (e: ChangeEvent<HTMLInputElement>) => void }> = ({ divInputId, labelText, value, onValueChange }) => {


    return <div id={`div-input-${divInputId}`} className="flex items-center ">
        <Label text={labelText} />
        <div id="input-youtube-url" className="flex ml-auto">
            <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-black" id="inline-full-name" type="text" value={value} onChange={onValueChange} />
        </div>
    </div>
}

const DivInputLabelRight: FC<{ divInputId: string, labelText: string, value: string, onValueChange: (e: ChangeEvent<HTMLInputElement>) => void }> = ({ divInputId, labelText, value, onValueChange }) => {


    return <div id={`div-input-${divInputId}`} className="flex items-center space-x-2">

        <div id="input-youtube-url" className="flex ml-auto">
            <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-black" id="inline-full-name" type="text" value={value} onChange={onValueChange} />
        </div>


        <Label text={labelText} />
    </div>
}



const useFormState = () => {

    const [url, setUrl] = useState("");

    const [videoId, setVideoId] = useState("");
    const [sfa, setSfa] = useState("");
    const [tsMs, setTsMs] = useState("");
    const [tsMin, setTsMin] = useState("");
    const [tsHour, setTsHr] = useState("");


    const reset = (shouldResetVideo: boolean = true) => {

        if (shouldResetVideo) {
            setUrl("")
            setVideoId("")

        }

        setSfa("")
        setTsMs("")
        setTsMin("")
        setTsHr("")
    }

    return {
        url, setUrl, videoId, setVideoId, sfa, setSfa, tsMs, setTsMs, tsMin, setTsMin, tsHour, setTsHr, reset
    }
}

const CreateYoutubeReferenceForm = () => {

    // const [url, setUrl] = useState("");

    // const [videoId, setVideoId] = useState("");
    // const [sfa, setSfa] = useState("");
    // const [tsMs, setTsMs] = useState("");
    // const [tsMin, setTsMin] = useState("");
    // const [tsHour, setTsHr] = useState("");


    const { url, setUrl, videoId, setVideoId, sfa, setSfa, tsMs, setTsMs, tsMin, setTsMin, tsHour, setTsHr, reset } = useFormState()



    const dispatch = useAppDispatch();

    const token = useAppSelector(s => s.auth.token);

    const onUrlChange = (e: ChangeEvent<HTMLInputElement>) => {

        const url = e.target.value;
        setUrl(url);

        const videoId = youtube_parser(url)
        setVideoId(videoId)

    }


    const create = async () => {

        const data = {

            sfa_license_no: sfa,
            video_id: videoId,
            timestamp: `${tsHour}h${tsMin}m${tsMs}s`
        }
        try {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + token,
                },
            };
            const result = await axios.post(
                `${globalConfig.serverUrl}${Endpoints.youtubeReference.create}`,
                data,
                config,
            );
            dispatch(notify({ text: JSON.stringify(result.data), ms: 10000, type: "Info" }))
            reset()


        } catch (_error) {
            const error = _error as AxiosError;
            dispatch(notify({ text: JSON.stringify(error.message), ms: 10000, type: "Error" }))

        }
    }


    return <div className="flex flex-col items-center"><div>Create Youtube Reference Form</div>
        <div className="flex flex-col w-fit space-y-4 p-[10px] border-2 border-black bg-primary-default">
            <div className="flex flex-col w-full max-w-sm space-y-3">

                <DivInput divInputId="youtube-url" labelText="url (optional)" value={url} onValueChange={onUrlChange} />
                <DivInput divInputId="video-id" labelText="video id" value={videoId} onValueChange={e => setVideoId(e.target.value)} />
                <hr
                    className="flex h-0.5 border-t-0 bg-black opacity-100 dark:opacity-50" />
                <div className="flex flex-col">
                    <div className="flex">
                        <Label text="timestamp" />
                    </div>

                    <div className="flex">
                        <DivInputLabelRight divInputId="timestamp" labelText="h" value={tsHour} onValueChange={e => setTsHr(e.target.value)} />
                        <DivInputLabelRight divInputId="timestamp" labelText="min" value={tsMin} onValueChange={e => setTsMin(e.target.value)} />
                        <DivInputLabelRight divInputId="timestamp" labelText="sec" value={tsMs} onValueChange={e => setTsMs(e.target.value)} />
                    </div>
                </div>


                <DivInput divInputId="sfa-license-no" labelText="sfa license #" value={sfa} onValueChange={e => setSfa(e.target.value)} />


                <div className="flex ml-auto">
                    <ButtonFC text="Create" onClick={create} />
                </div>
            </div>
        </div >
    </div >
}



export default CreateYoutubeReferenceForm