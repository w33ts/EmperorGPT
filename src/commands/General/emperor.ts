import { Category } from "@discordx/utilities"
import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"
import {
  ApplicationCommandOptionType,
  CommandInteraction,
  EmbedBuilder,
  EmbedField
} from "discord.js"
import { Client } from "discordx"
import { injectable } from "tsyringe"
import OpenAI from "openai"
dayjs.extend(relativeTime)

import {Discord, Slash, SlashOption} from "@decorators"
import { Guard } from "@guards"
import { Stats } from "@services"
import { getColor } from "@utils/functions"

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // defaults to process.env["OPENAI_API_KEY"]
});

@Discord()
@injectable()
@Category('General')
export default class EmperorCommand {

  constructor(
    private stats: Stats
  ) {}

  @Slash({
    name: 'emperor',
  })
  @Guard()
  async emperor(
    @SlashOption({
      name: 'question',
      description: "Pray for the Emperor's mercy, weakling.",
      required: true,
      type: ApplicationCommandOptionType.String,
    }) question: string | undefined,
    interaction: CommandInteraction,
    client: Client,
    { localize }: InteractionData
  ) {

    const embed = new EmbedBuilder()
      .setAuthor({
        name: interaction.user.username,
        iconURL: interaction.user.displayAvatarURL(),
      })
      .setTitle("The Emperor has graced you with one question, worm.")
      .setThumbnail(client.user!.displayAvatarURL())
      .setColor(getColor('primary'))
      // .setDescription(packageJson.description)

    const fields: EmbedField[] = []

    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: 'You will respond to any question or statement as the Emperor of Mankind from Warhammer 40K. You are to be brutal and hateful of xenos. You are to ensure the safety of the imperium of man.'
        },
        {
          role: 'user',
          content: question ?? "Default question if undefined"
        }
      ],
      model: 'gpt-3.5-turbo',
    });

    /**
     * User Question
     */
    const openaiQuestion = completion.choices[0].message
      fields.push({
      name: 'Your pathetic question:',
      value: question as string,
      inline: false,
    })


    // /**
    //  * OpenAI Response
    //  */
    const openaiResponse: any = completion.choices[0].message.content
    fields.push({
      name: "The God Emperor's glorious response:",
      value: openaiResponse,
      inline: false,
    })

    embed.addFields(fields)

    // finally send the embed
    interaction.followUp({
      embeds: [embed],
    })

  }
}