import json
import subprocess
import os
import requests
 # Get the directory of the current script
script_directory = os.path.dirname(os.path.abspath(__file__))
steam_maindir = "C:\Program Files (x86)\Steam"

# Sample text data
output_data = "fakfae."
def main():
    # Replace 'YOUR_STEAM_API_KEY' with your actual Steam API key
    steam_api_key = 'YOUR_STEAM_API_KEY'
    base_url = 'http://store.steampowered.com/api/appdetails/'
    app_id = 570
    # Make a request to the GetAppDetails endpoint
    response = requests.get(f'{base_url}?appids={app_id}&key={steam_api_key}')

    if response.status_code == 200:
        data = response.json()
        if str(app_id) in data and data[str(app_id)]['success']:
            game_info = data[str(app_id)]['data']
            print(f"Icon URL: {game_info['img_icon_url']}")
            return game_info
        else:
            print(f"Error: Unable to get information for app ID {app_id}")
    else:
        print(f"Error: Unable to connect to the Steam API. Status code: {response.status_code}")


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