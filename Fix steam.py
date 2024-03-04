import json
import subprocess
import os
import requests
 # Get the directory of the current script
script_directory = os.path.dirname(os.path.abspath(__file__))
steam_maindir = "C:\\Program Files (x86)\\Steam"


# Sample text data
output_data = "fakfae."
def main():
    print("interpreter workiks")
    jsondata=parseInfo(570)
    getClientIconKey(jsondata)

def parseInfo(app_id_to_query):
    app_info = get_app_info(app_id_to_query)

    if app_info:
        print(f"App Info for App ID {app_id_to_query}:\n{json.dumps(app_info, indent=2)}")
    
    with open(app_info,"r") as jsoncontent:
        file_contents = jsoncontent.read()
    #print(file_contents)
    # Parse the JSON-like content
    data = json.loads(file_contents)
    return data

def getClientIconKey(data):
    """Extract and return a list of app IDs."""
    app_ids = set()

    for folder_key in data.get("libraryfolders", {}):
        folder = data["libraryfolders"][folder_key]
        #print(folder.get("path", {}))
        apps = folder.get("apps", {})
        app_ids.update(apps.keys())
    return sorted(app_ids, key=int)


def get_app_info(app_id):
    info_url = "http://localhost:8080/info?apps=570"
    print(info_url)
    # Make a request to the API endpoint
    response = requests.get(info_url)

    if response.status_code == 200:
        app_info = response.json()
        return app_info
    else:
        print(f"Error: Unable to retrieve app info. Status code: {response.status_code}")
        return None


def saveicon():
    iconlocations = "\\steam\\games\\"
    outputfalie = steam_maindir+iconlocations+"output.txt"
    iconurl = "https://cdn.cloudflare.steamstatic.com/steamcommunity/public/images/apps/570/c0d15684e6c186289b50dfe083f5c562c57e8fb6.ico"
    print(outputfalie)
    with open(outputfalie, "w") as file:
            file.write(output_data)
    subprocess.run(["explorer", outputfalie], shell=True)        

def getjsondata():
    with open("libraryfolders.json","r") as libfolderdata:
        file_contents = libfolderdata.read()
    #print(file_contents)
    # Parse the JSON-like content
    data = json.loads(file_contents)
    return data

def get_app_ids(data):
    """Extract and return a list of app IDs."""
    app_ids = set()

    for folder_key in data.get("libraryfolders", {}):
        folder = data["libraryfolders"][folder_key]
        #print(folder.get("path", {}))
        apps = folder.get("apps", {})
        app_ids.update(apps.keys())
    return sorted(app_ids, key=int)

def printappidlist():
    applist = get_app_ids(getjsondata())
    for gameID in applist:
        print (gameID)


def save():

       

    # Specify the file name and path
    file_name = "output.txt"
    file_path = os.path.join(script_directory, file_name)

    # Print the text data
    print("########")
    print("########")
    print(output_data)
    print("########")
    print("########")
    # Save the text to a file
    with open(file_path, "w") as file:
        file.write(output_data)

    print(f"\nText saved to {file_name} in {file_path}.")

    # Open the file in the default file explorer
    subprocess.run(["explorer", file_path], shell=True)

if __name__ == "__main__":
    main()
else:
    print("yo this was not suppoed to happen")