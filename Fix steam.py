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
    fixIcon(570)

def fixIcon(app_id):
    jsondata=get_app_info_as_json(app_id)
    print("Got json")
    clientIconString = get_client_icon(jsondata,app_id)
    if(clientIconString):
        print("got")
        saveicon(app_id,clientIconString)


def get_client_icon(data, app_id):
    # Check if the app_id is present in the data
    if "apps" in data and str(app_id) in data["apps"]:
        app_info = data["apps"][str(app_id)]
        if "common" in app_info:
            common_info = app_info["common"]
            if "clienticon" in common_info:
                return common_info["clienticon"]
            else:
                print("Critial Error"+ app_id + common_info["name"]+" does not have a client icon")

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


def saveicon(app_id,clientIconString):
    iconlocations = "\\steam\\games\\"
    outputfalie = steam_maindir+iconlocations+clientIconString+".ico"
    iconurl = f"https://cdn.cloudflare.steamstatic.com/steamcommunity/public/images/apps/"+str(app_id)+"/"+clientIconString+".ico"
    print(outputfalie)
    with open(outputfalie, "wb") as file:
            file.write(iconurl)
    #subprocess.run(["explorer", steam_maindir+iconlocations], shell=False)    

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