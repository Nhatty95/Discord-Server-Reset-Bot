# Discord-Server-Reset-Bot

**IMPORTANT: READ THIS DOCUMENT CAREFULLY BEFORE USING THIS SOFTWARE.**

This bot provides functionality to reset a Discord server by deleting channels and roles. While it can be helpful for legitimate server management, **using this bot to delete server content without explicit consent ("nuking") is a violation of Discord's Terms of Service and may result in your account and the bot's account being terminated.**

**I the developer of this bot, explicitly state that I am NOT responsible for any consequences arising from the misuse of this bot. Users are solely responsible for complying with Discord's Terms of Service and all applicable laws.**

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

**Key aspects of the MIT License:**

*   **Permissive:** Allows for free use, modification, and distribution (even commercially).
*   **No Warranty:**  The software is provided "as is," without any warranty.
*   **Disclaimer of Liability:**  The author is not liable for any damages arising from the use of this software.

**By using this software, you agree to the terms of the MIT License.**

## Disclaimer

**I strongly condemn the use of this bot for malicious purposes, including but not limited to unauthorized server "nuking."**

This bot is intended to be a tool for server owners to manage and reset *their own* servers. Misusing this tool against the rules of Discord or against the wishes of server owners is unethical and potentially illegal.

**I will not provide support or assistance for any use of this bot that violates Discord's Terms of Service.**

## Setup

### Prerequisites

1. **Node.js:** You need to have Node.js installed on your system. You can download it from [https://nodejs.org/](https://nodejs.org/).
2. **Discord Developer Account:** You'll need a Discord account and a registered application in the Discord Developer Portal ([https://discord.com/developers/applications](https://discord.com/developers/applications)).
3. **Bot Token:** In the Developer Portal, create a bot user for your application and obtain its token.
4. **Client ID:**  You'll find the Client ID on the "General Information" page of your application.
5. **Guild ID:** Enable Developer Mode in Discord (User Settings > Advanced), then right-click on the server you want to reset and select "Copy ID."
6. **Authorized User ID:** This is the ID of the user who will be allowed to run the reset command. Right-click on your user in Discord (with Developer Mode enabled) and select "Copy ID."

### Installation

1. **Clone the repository:**
    ```bash
    git clone https://github.com/Nhatty95/Discord-Server-Reset-Bot.git
    cd Discord-Server-Reset-Bot
    ```


2. **Install dependencies:**
    ```bash
    npm install discord.js dotenv
    ```

3. **Environment variables:**
    *   Rename the `.env.example` file to `.env`.
    *   Open `.env` and fill in the following values:
        ```
        DISCORD_TOKEN=YOUR_BOT_TOKEN
        AUTHORIZED_GUILD_ID=YOUR_GUILD_ID
        AUTHORIZED_USER_ID=YOUR_USER_ID
        CLIENT_ID=YOUR_CLIENT_ID
        ```

### Bot Permissions

Make sure to invite your bot to your server with the following permissions:

*   **Manage Channels:** Required to delete and create channels.
*   **Manage Roles:** Required to delete roles.
*   **Read Messages/View Channels:** Required for basic functionality.
*   **Send Messages:** Required to send confirmation messages.
*   **Message Content Intent:** (In the Developer Portal) Required for the bot to read message content and process commands.

You can generate an invite link for your bot from the OAuth2 page of your application in the Developer Portal, making sure to select the necessary permissions.

## Usage

1. **Start the bot:**
    ```bash
    node index.js
    ```

2. **Commands:**
    *   **`>ping`:** Checks if the bot is working and shows the latency.
    *   **`>reset`:** **(USE WITH EXTREME CAUTION)** Resets the server by deleting channels and roles (except for the @everyone role and managed bot roles). **Only the authorized user in the `AUTHORIZED_USER_ID` environment variable can use this command.**

**Warning:** The `>reset` command is irreversible. Once executed, channels and roles will be permanently deleted. It is strongly recommended to have backups of your server if you intend to use this command.

## Troubleshooting

*   **Bot is not responding:**
    *   Make sure the bot is online in your Discord server.
    *   Check if you are using the correct prefix (`>`).
    *   Verify that the `DISCORD_TOKEN`, `AUTHORIZED_GUILD_ID`, and `AUTHORIZED_USER_ID` are correct in your `.env` file.
    *   Ensure the "Message Content Intent" is enabled in the Bot settings in the Discord Developer Portal.
    *   Check the bot's permissions in your server settings.

*   **Errors during reset:**
    *   The bot might not have sufficient permissions (Manage Channels, Manage Roles).
    *   Rate limiting by Discord might occur if the server has a large number of channels or roles. The code includes a delay to mitigate this, but you might need to adjust the `RATE_LIMIT_DELAY` in the code if you encounter issues.

## Contributing

If you'd like to contribute to the development of this bot, please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Make your changes and commit them with clear and descriptive commit messages.
4. Submit a pull request.

## Contact

If you have any questions or issues that are **not related to misuse of the bot**, feel free to open an issue on the repository.

**Again, I emphasize that I am not responsible for any misuse of this bot and strongly discourage any actions that violate Discord's Terms of Service.**
