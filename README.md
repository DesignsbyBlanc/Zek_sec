# Zek Security

This project was built to be a submission for the [Gemini API competition](https://ai.google.dev/competition)

[ZekMVP.webm](https://github.com/user-attachments/assets/2de40ae8-83c3-472a-a56c-dff1bf744df3)

| Screenshot 1    | Screenshot 2 |
| -------- | ------- |
|![D1E8B3AC-20F8-401B-B0DD-9D433467DC19_4_5005_c](https://github.com/user-attachments/assets/e2b29fa2-941e-4762-9f04-85546685c7eb) | ![FAB2950C-62FB-465A-A2EF-440FD40548BF_4_5005_c](https://github.com/user-attachments/assets/d1418b6b-e332-41a9-9978-bfce6c453ce0)    |



#### Frontend was built with T3 Create app

The frontend is essentially just a viewport at this point in the implementation. There is no interactivity with chat nor is the stream being used for anything else. Ultimately, I'd love to use something like the 
[livekit](https://kitt.livekit.io/) framework to pass the stream directly to Gemini. To simulate what I would like to get done using livekit I have FastAPI serving a JSON that reads the last stored query from Gemini and the frontend chat component reads that. Ideally, I also have a FastAPI POST route that accepts an RTSP URL and then runs the script to convert that to a stream to send back to the frontend. Eliminating the manual process shown in this [video](https://youtu.be/tGvqoIT4iPE). I'd also love to add [Homebridge](https://homebridge.io/) and [Home Assistant](https://www.home-assistant.io/) integrations.

#### To run test case:

1. Clone repo
2. npm i, update environment variables like `DATABASE_URL` (check `env.js`), then npm run dev (I chose to use a local instance of MySQL community server and EMAIL PROVIDER for auth)
3. Unzip zek_backend and update any absolute file paths in the "myapi" in the "fast_api" folder and related scripts accordingly (e.g. _script_to_run = '/Path/to/zek_backend/gemini_utils/query_file.py'_ in myapi.py)
4. `pip install -r reqmacos.txt` or only install imported packages by scripts used
5. Create "env_local.py" in _"/path/to/z_gemini/zek_backend/gemini_utils"_ and add your _GOOGLE_API_KEY = ""_
6. Run _"/Path/to/zek_backend/gemini_utils/upload_video_file.py"_ to upload the mp4 files from _"/Path/to/zek_backend/stream_server/test_stream/mp4"_
7. Open a separate terminal to run an http server in _"/path/to/zek_backend/stream_server/test_stream"_ (`python -m http.server 8100`)
8. Paste your `http://[::]:8100/` into url field on `localhost:3000`
9. Open separate terminal, change directory to "fast_api"
10. Set QUERY_GO="True" as environment variable
11. Run `uvicorn myapi:app --reload --host 0.0.0.0`



#### Gemini Code: 
This portion of the code performs the query and writes the response to a JSON file that is then served by FastAPI and read by the Web app.
``` python

def query(filey, chosen_file="segment_2.mp4"):
    try:
        if filey[chosen_file]:
            # Create the prompt.
            prompt = "Describe this video. Use the date and time stamp as for bullet points"

            # Set the model to Gemini 1.5 Pro.
            model = genai.GenerativeModel(model_name="models/gemini-1.5-pro-latest")

            # Make the LLM request.
            print("Making LLM inference request...")
            response = model.generate_content([prompt, filey[chosen_file]],
                                            request_options={"timeout": 600})
            
            with open("/path/to/chat_response.json", 'w') as file:
                json.dump(response.text, file, indent=4)
            # print(response.text)
            # return(response.text)
    except Exception as e:
        print(f"File does {e} not exist")



```

This portion uploads the video files to Gemini:

```Python

def up_files_genai():
    genai.configure(api_key=GOOGLE_API_KEY)

    folder_name = "/path/to/zek_backend/stream_server/test_stream/mp4/"

    streams = all_folder_files(folder=folder_name, file_extension="mp4")
    dc_of_uploads = {}

    for s in streams:
        print(f"\n Uploading file... \n")
        video_file = genai.upload_file(path=s)
        print(video_file)
        print(f"Completed upload: {video_file.uri}")
        dc_of_uploads[video_file.display_name] = video_file

        while video_file.state.name == "PROCESSING":
            print('.', end='')
            time.sleep(10)
            video_file = genai.get_file(video_file.name)


        if video_file.state.name == "FAILED":
            raise ValueError(video_file.state.name)

    return dc_of_uploads


```



