import { signIn, signOut, useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import ChatBotCard from "~/components/ChatBotCard";
import RtspStreamViewer from "~/components/RtspStreamViewer";

import { api } from "~/utils/api";

export default function Home() {
  const [url, setUrl] = useState("")
  const [stream, showStream] = useState(false)
  const hello = api.post.hello.useQuery({ text: "from tRPC" });
  const streamButtonSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    showStream(true)
  } 
  const getStreamURL = <form className="max-w-96 mx-auto" onSubmit={streamButtonSubmit} >
  <div className="mb-5 w-96">
    <label htmlFor="RTSPURL" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Camera Stream URL</label>
    <input type="RTSPURL" id="RTSPURL" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="rtsp://10.0.0.1"  value={url} onChange={(e) => setUrl(e.target.value)} required />
  </div>
  <button type="submit" className="block mx-auto text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Stream</button>
</form> 

const streamAndChat = <div className="grid grid-col-4 grid-flow-col gap-4 "> 

<div className="col-span-3">
  <RtspStreamViewer url={url} />
</div> 

<div className="col-span-1 w-96 rounded-lg overflow-hidden"> <ChatBotCard />  </div> 

</div> 


  return (
    <>
      <Head>
        <title>Zek Security</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen overflow-hidden flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
          <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
            Zek <span className="text-[hsl(280,100%,70%)]">Security</span> 
          </h1>
          <p className="text-sm font-extrabold tracking-tight text-white">Your 24/7 security monitoring solution powered by Googe Gemini AI</p>
          {/* <div className="flex flex-col items-center gap-2">
            <p className="text-2xl text-white">
              {hello.data ? hello.data.greeting : "Loading tRPC query..."}
            </p>
            <AuthShowcase />
          </div> */}
          

{stream ? streamAndChat : getStreamURL }

        </div>
      </main>
    </>
  );
}

function AuthShowcase() {
  const { data: sessionData } = useSession();

  // const { data: secretMessage } = api.post.getSecretMessage.useQuery(
  //   undefined, // no input
  //   { enabled: sessionData?.user !== undefined }
  // );

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <p className="text-center text-2xl text-white">
        {sessionData && <span>Logged in as {sessionData.user?.email}</span>}
        {/* {secretMessage && <span> - {secretMessage}</span>} */}
        <span> THIS IS A SECRET MESSAGE</span>
      </p>
      <button
        className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
        onClick={sessionData ? () => void signOut() : () => void signIn()}
      >
        {sessionData ? "Sign out" : "Sign in"}
      </button>
    </div>
  );
}
