#Python 2.x program for Speech Recognition
 
import speech_recognition as sr
import httplib2
import json
from gtts import gTTS
import os
import time
from pygame import mixer
from mutagen.mp3 import MP3
#enter the name of usb microphone that you found
#using lsusb
#the following name is only used as an example
mic_name = "USB PnP Sound Device: Audio (hw:2,0)"
#Sample rate is how often values are recorded
sample_rate = 48000
#Chunk is like a buffer. It stores 2048 samples (bytes of data)
#here. 
#it is advisable to use powers of 2 such as 1024 or 2048
chunk_size = 2048
#Initialize the recognizer
r = sr.Recognizer()
 
#generate a list of all audio cards/microphones
mic_list = sr.Microphone.list_microphone_names()
 
#the following loop aims to set the device ID of the mic that
#we specifically want to use to avoid ambiguity.
for i, microphone_name in enumerate(mic_list):
    print microphone_name
    if microphone_name == mic_name:
    	#print microphone_name
        device_id = i
 
#use the microphone as source for input. Here, we also specify 
#which device ID to specifically look for incase the microphone 
#is not working, an error will pop up saying "device_id undefined"

def interpret(source):
	text=""
	print "Say Something"
	#listens for the user's input
	audio = r.listen(source)
	 
	try:
		text = r.recognize_google(audio)
		#print "you said: " + text
		return text

	#error occurs when google could not understand what was said

	except sr.UnknownValueError:
		print("Could not understand audio")
		return "Could not understand audio"

	except sr.RequestError as e:
		print("Could not request results from Google Speech Recognition service; {0}".format(e))
		return "Could not request results from Google Speech Recognition service"

	
	
with sr.Microphone(device_index = device_id, sample_rate = sample_rate, chunk_size = chunk_size) as source:
    #wait for a second to let the recognizer adjust the 
    #energy threshold based on the surrounding noise level
    r.adjust_for_ambient_noise(source)
    out=""
    url = "http://192.168.43.207"
    #tts language
    language = 'en'
    
    mixer.init()
    while(1):
    	
	    out=interpret(source)
	    print "Interpreted "+ out
	    speech = ""
	    speech = out
	    if out == "turn on the lights" or out=="turn on the light" or out == "switch on the lights" or out == "switch on the light":
	    	resp,content = httplib2.Http().request(url+"/measures.json")
	    	data = json.loads(content)
	    	if data['l']=='1':
	    		httplib2.Http().request(url+"/switchled")
	    		speech = "The lights have been switched on"
	    	elif data['l']=='0':
	    		speech = "The lights are already switched on"
	    		
	    elif out == "turn off the lights" or out=="turn off the light" or out == "switch off the lights" or out == "switch off the light":
	    	resp,content = httplib2.Http().request(url+"/measures.json")
	    	data = json.loads(content)
	    	if data['l']=='0':
	    		httplib2.Http().request(url+"/switchled")
	    		speech = "The lights have been switched off"
	    	elif data['l']=='1':
	    		speech = "The lights are already switched off"
	    
	    elif out=="are the lights on" or out =="is the light on":
	    	resp,content = httplib2.Http().request(url+"/measures.json")
	 	data = json.loads(content)
	 	if data['l']=='0':
	    		speech = "Yes, the lights are on"
	 	elif data['l']=='1':
	    		speech = "No, the lights are off"
	    		
	    elif out=="are the lights off" or out =="is the light off":
	    	resp,content = httplib2.Http().request(url+"/measures.json")
	 	data = json.loads(content)
	 	if data['l']=='0':
	    		speech = "Yes, the lights are on"
	 	elif data['l']=='1':
	    		speech = "No, the lights are off"
	 	
	    elif out == "what is the temperature" or out == "what's the temperature":
	    	resp,content = httplib2.Http().request(url+"/measures.json")
	    	data = json.loads(content)
	    	speech = "The current temperature is "+data['t']+" degrees"
	    	print speech
	    	
	    elif out == "what is the humidity" or out == "what's the humidity":
	 
	 	resp,content = httplib2.Http().request(url+"/measures.json")
	    	data = json.loads(content)
	    	speech = "The current humidity is "+data['h']+" percent"
	    	print speech
	    	
 
	    # Saving the converted audio in a mp3 file named
	    # welcome 
	    if speech:
	    	    myobj = gTTS(text=speech, lang=language, slow=False)
		    myobj.save("speech.mp3")
		    
		    # Playing the converted file
		    #os.system("mpg321 welcome.mp3")
		    
		    mixer.music.load('speech.mp3')
		    audio = MP3("speech.mp3")
		    speech_len = audio.info.length
		  
		    mixer.music.play()
		    time.sleep(speech_len+1)
	    	
	      
