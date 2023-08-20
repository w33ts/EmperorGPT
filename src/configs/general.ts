export const generalConfig: GeneralConfigType = {

	name: 'EmperorGPT', // the name of your bot
	description: '', // the description of your bot
	defaultLocale: 'en', // default language of the bot, must be a valid locale
	ownerId: process.env['BOT_OWNER_ID'] || '',
	timezone: 'America/New_York', // default TimeZone to well format and localize dates (logs, stats, etc)

	simpleCommandsPrefix: '!', // default prefix for simple command messages (old way to do commands on discord)
	automaticDeferring: true, // enable or not the automatic deferring of the replies of the bot on the command interactions

	// useful links
	links: {
		invite: 'https://www.change_invite_link_here.com',
		supportServer: 'https://discord.com/your_invitation_link',
		gitRemoteRepo: 'https://github.com/barthofu/tscord',
	},
	
	automaticUploadImagesToImgur: false, // enable or not the automatic assets upload

	devs: [], // discord IDs of the devs that are working on the bot (you don't have to put the owner's id here)

	eval: {
		name: 'bot', // name to trigger the eval command
		onlyOwner: false // restrict the eval command to the owner only (if not, all the devs can trigger it)
	},

	// define the bot activities (phrases under its name). Types can be: PLAYING, LISTENING, WATCHING, STREAMING
    activities: [
		{
			text: 'over the Imperium of Man',
			type: 'WATCHING'
		}
		// {
		// 	text: 'some knowledge',
		// 	type: 'STREAMING'
		// }
	]

}

// global colors
export const colorsConfig = {

	primary: '#fff200'
}
