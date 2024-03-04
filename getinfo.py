import requests
from bs4 import BeautifulSoup

def get_html_content(url):
    headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
}
    try:
        response = requests.get(url, headers=headers)
        response.raise_for_status()
        return response.text
    except requests.exceptions.RequestException as e:
        print(f"Error: {e}")
        return None

def parse_steamdb_content(html_content):
    soup = BeautifulSoup(html_content, 'html.parser')

    # Example: Extracting the title of the SteamDB page
    title = soup.title.text
    print(f"Title: {title}")

    # Example: Extracting the description of the app
    description = soup.find('meta', {'name': 'description'}).get('content', '')
    print(f"Description: {description}")

    # Add more parsing logic based on the structure of the HTML

def main():
    steamdb_url = "https://steamdb.info/app/570/"
    html_content = get_html_content(steamdb_url)

    if html_content:
        parse_steamdb_content(html_content)
    else:
        print("Failed to retrieve HTML content.")

if __name__ == "__main__":
    main()
