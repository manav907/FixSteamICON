import requests

def get_asset_prices(app_id):
    # Replace 'YOUR_STEAM_API_KEY' with your actual Steam API key
    steam_api_key = '0454723C449D7D70C35DAE286C05448F'
    base_url = 'https://api.steampowered.com/ISteamEconomy/GetAssetPrices/v1/'

    # Make a request to the GetAssetPrices endpoint for the specified app ID
    response = requests.get(f'{base_url}?appid={app_id}&key={steam_api_key}')

    if response.status_code == 200:
        data = response.json()
        print(data)
        return data.get('prices', [])
    else:
        print(f"Error: Unable to connect to the Steam API. Status code: {response.status_code}")
        return None

def get_client_icon_url(app_id):
    asset_prices = get_asset_prices(app_id)

    if asset_prices:
        for asset in asset_prices:
            if 'clienticon' in asset:
                return asset['clienticon']
        
    return None

def main():
    # Example: Get client icon URL for the game with app ID 570 (Dota 2)
    app_id = 570
    client_icon_url = get_client_icon_url(app_id)

    if client_icon_url:
        print(f"Client Icon URL: {client_icon_url}")
    else:
        print(f"Client icon not found for app ID {app_id}")

if __name__ == "__main__":
    main()
