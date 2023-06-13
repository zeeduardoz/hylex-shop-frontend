import crypto from 'crypto'
import DiscordOauth2 from 'discord-oauth2'
import jwt from 'jsonwebtoken'
import * as fs from 'fs'
import { api } from '@services/apiClient'

export async function DiscordSignIn() {
  const oauth = new DiscordOauth2({
    clientId: process.env.DISCORD_CLIENT_ID,
    clientSecret: process.env.DISCORD_CLIENT_SECRET,
    redirectUri: process.env.DISCORD_CALLBACK
  })

  const url = oauth.generateAuthUrl({
    scope: ['identify'],
    state: crypto.randomBytes(16).toString('hex')
  })

  return url
}

export async function DiscordCallback(code: any) {
  const oauth = new DiscordOauth2()

  try {
    const { access_token: accessToken } = await oauth.tokenRequest({
      clientId: process.env.DISCORD_CLIENT_ID,
      clientSecret: process.env.DISCORD_CLIENT_SECRET,

      code,
      scope: ['identify'],
      grantType: 'authorization_code',

      redirectUri: process.env.DISCORD_CALLBACK
    })

    const { id } = await oauth.getUser(accessToken)

    const path = process.env.DISCORD_PEM_DIRECTORY
      ? process.env.DISCORD_PEM_DIRECTORY
      : ''

    const key = fs.readFileSync(path, {
      encoding: 'utf8'
    })

    const tokenJwt = jwt.sign({}, key, {
      subject: id,
      expiresIn: '2m',
      algorithm: 'RS256'
    })

    const response = await api.post(
      '/auth/loginDc',
      {},
      {
        headers: { Authorization: 'Bearer ' + tokenJwt }
      }
    )

    return response.data
  } catch (err) {
    console.log(err)
    return { status: 500 }
  }
}
