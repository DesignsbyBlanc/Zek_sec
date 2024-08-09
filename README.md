# Zek Security

[ZekMVP.webm](https://github.com/user-attachments/assets/2de40ae8-83c3-472a-a56c-dff1bf744df3)

#### Frontend was built with T3 Create app

The frontend is essentially just a viewport at this point in the implementation. There is no interactivity with chat or the stream being used for anything else. Ultimately, I'd love to use something like the 
[livekit](https://kitt.livekit.io/) framework to pass the stream directly to Gemini. To simulate what I would like to get done using livekit I have FastAPI serving a JSON that reads the last stored query from Gemini and the frontend chat component reads that. Ideally, I also have a FastAPI POST route that accepts an RTSP URL and then runs the script to convert that to a stream to send back to the frontend. Eliminating the manual process shown in this [video](https://youtu.be/tGvqoIT4iPE). 

#### To run:

1. Clone repo
2. npm i, npm run dev
3. unzip zek_backend and update any absolute file paths in the "myapi" in the "fast_api" folder and related scripts accordingly
4. `pip install -r reqmacos.txt` or only install imported packages by scripts used
5. Open a separate terminal to run an http server in "zek_backend/stream_server/test_stream" (`python -m http.server 8100`)
6. Paste your `http://[::]:8100/` into url field on `localhost:3000`
7. Open separate terminal, change directory to "fast_api" 
8. set QUERY_GO="True" as environment variable
9. run `uvicorn myapi:app --reload --host 0.0.0.0`


![D1E8B3AC-20F8-401B-B0DD-9D433467DC19_4_5005_c](https://github.com/user-attachments/assets/e2b29fa2-941e-4762-9f04-85546685c7eb)


![FAB2950C-62FB-465A-A2EF-440FD40548BF_4_5005_c](https://github.com/user-attachments/assets/d1418b6b-e332-41a9-9978-bfce6c453ce0)



