const { Client, GatewayIntentBits, ChannelType, PermissionFlagsBits } = require('discord.js');
require('dotenv').config();

// Load sensitive values from environment variables
const AUTHORIZED_USER_ID = process.env.AUTHORIZED_USER_ID;
const AUTHORIZED_GUILD_ID = process.env.AUTHORIZED_GUILD_ID;
const CLIENT_ID = process.env.CLIENT_ID;
const PREFIX = '>';
const RATE_LIMIT_DELAY = 1000;

// Create a new client instance with necessary intents
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.MessageContent
    ],
});

// Event: Bot is ready
client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

// Utility function to introduce delays
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Message listener
client.on('messageCreate', async (message) => {
    if (message.author.bot || !message.content.startsWith(PREFIX)) return;

    const args = message.content.slice(PREFIX.length).trim().split(/\s+/);
    const command = args.shift().toLowerCase();

    if (command === 'ping') {
        await message.reply(`Pong! Latency: ${Math.round(client.ws.ping)}ms`);
    }

    if (command === 'reset') {
        if (
            message.guild.id === AUTHORIZED_GUILD_ID &&
            message.author.id === AUTHORIZED_USER_ID
        ) {
            if (!message.guild.members.me.permissions.has(PermissionFlagsBits.ManageChannels) ||
                !message.guild.members.me.permissions.has(PermissionFlagsBits.ManageRoles)) {
                await message.reply("I don't have the necessary permissions (Manage Channels and Manage Roles) to reset the server.");
                return;
            }

            try {
                await message.reply('Starting server reset...');

                // Delete all channels sequentially with a delay
                const channels = message.guild.channels.cache;
                for (const [id, channel] of channels) {
                    try {
                        await channel.delete();
                        console.log(`Deleted channel: ${channel.name}`);
                        await delay(RATE_LIMIT_DELAY);
                    } catch (error) {
                        console.error(`Error deleting channel ${channel.name}:`, error);
                        if (error.code === 50013) {
                            await message.channel.send(`Missing permissions to delete channel: ${channel.name}`);
                        }
                    }
                }

                // Recreate default channels sequentially
                const generalChannel = await message.guild.channels.create({
                    name: 'general',
                    type: ChannelType.GuildText,
                });
                console.log(`Created text channel: ${generalChannel.name}`);

                const voiceChannel = await message.guild.channels.create({
                    name: 'Voice Chat',
                    type: ChannelType.GuildVoice,
                });
                console.log(`Created voice channel: ${voiceChannel.name}`);

                // Delete all roles (except @everyone and managed roles) sequentially with a delay
                const roles = message.guild.roles.cache.filter(
                    (role) => role.name !== '@everyone' && !role.managed
                );
                for (const [id, role] of roles) {
                    try {
                        await role.delete();
                        console.log(`Deleted role: ${role.name}`);
                        await delay(RATE_LIMIT_DELAY);
                    } catch (error) {
                        console.error(`Error deleting role ${role.name}:`, error);
                        if (error.code === 50013) {
                            await message.channel.send(`Missing permissions to delete role: ${role.name}`);
                        }
                    }
                }

                await generalChannel.send('Server reset successfully.');
                console.log('Server reset completed.');

            } catch (error) {
                console.error('Error resetting server:', error);
                await message.reply('An error occurred while resetting the server.');
            }
        } else {
            await message.reply('You are not authorized to use this command.');
        }
    }
});

client.login(process.env.DISCORD_TOKEN);