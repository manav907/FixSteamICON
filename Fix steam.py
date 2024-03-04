import json
import subprocess
import os
import requests
 # Get the directory of the current script
script_directory = os.path.dirname(os.path.abspath(__file__))
steam_maindir = "C:\\Program Files (x86)\\Steam"


# Sample text data
def main():
    print("interpreter workiks")
    getjsondata()
    for app_id in get_app_ids(getjsondata()):
        fixIcon(app_id)

def fixIcon(app_id):
    jsondata=get_app_info_as_json(app_id)
    clientIconString = get_client_icon(jsondata,app_id)
    if(clientIconString):
        saveicon(app_id,clientIconString)

fixIconStatus=""
def get_client_icon(data, app_id):
    global fixIconStatus
    # Check if the app_id is present in the data
    if "apps" in data and str(app_id) in data["apps"]:
        app_info = data["apps"][str(app_id)]
        if "common" in app_info:
            common_info = app_info["common"]
            fixIconStatus+= str(app_id) + " - " + common_info["name"] + " - "
            if "clienticon" in common_info:
                return common_info["clienticon"]
            else:
                print("########")
                print(str(app_id) + " - " + common_info["name"] + " - Critical Error does not have a client icon")
                print("########")
                fixIconStatus=""
    # If the app_id is not found or doesn't have the required information
    return None


def get_app_info_as_json(app_id):
    info_url = "http://localhost:8080/info?apps="+str(app_id)
    #print(info_url)
    # Make a request to the API endpoint
    response = requests.get(info_url)

    if response.status_code == 200:
        app_info = response.json()
        return app_info
    else:
        print(f"Error: Unable to retrieve app info. Status code: {response.status_code}")
        return None


def saveicon(app_id,client_icon_string):
    global fixIconStatus
    icon_locations = "\\steam\\games\\"
    output_file = steam_maindir + icon_locations + client_icon_string + ".ico"
    icon_url = f"https://cdn.cloudflare.steamstatic.com/steamcommunity/public/images/apps/{app_id}/{client_icon_string}.ico"
    response = requests.get(icon_url)
    if response.status_code == 200:
        with open(output_file, "wb") as file:
            file.write(response.content)
        print(fixIconStatus +"Icon saved successfully.")
        fixIconStatus=""
    else:
        print(f"Failed to download icon. Status code: {response.status_code}")
  

def getjsondata():
    script_directory = os.path.dirname(os.path.realpath(__file__))
    file_path = os.path.join(script_directory, "libraryfolders.json")

    with open(file_path, "r") as libfolderdata:
        file_contents = libfolderdata.read()
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
if __name__ == "__main__":
    main()
else:
    print("yo this was not suppoed to happen")