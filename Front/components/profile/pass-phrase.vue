<template>
  <v-dialog v-model="isOpened">
    <v-card>
      <v-card-text class="pass-phrase-section">
        <h2>Pass phrase</h2>
        <p class="">
          Fill in Your pass phrase get access to the chat
        </p>
        <v-text-field
          v-model="passPhrase"
          class="--input --group"
          label="Pass phrase"
          placeholder=""
          :error="!!passPhraseErrorMessage"
          :error-messages="passPhraseErrorMessage"
          :variant="InputVariants.FILLED"
          @update:model-value="passPhraseHasError"
        ></v-text-field>

        <v-btn class="--submit" variant="elevated" @click="verifyKey()"> Verify </v-btn>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script lang="ts" setup>
import { ethers } from 'ethers'
import { InputVariants } from '~~/assets/ts/enums/style'
import { decryptKey } from '~~/modules/ethers/keyEncrypter'

const passPhraseErrorMessage = ref<string>('')
const passPhrase = ref<string>('')

const props = defineProps({
  isOpened: {
    type: Boolean,
    default: false
  }
})

const isOpened = ref<boolean>(true)

watch(
  () => props.isOpened,
  () => {
    isOpened.value = props.isOpened
  }
)

const verifyKey = () => {
  try {
    const cryptedKey = useSessionStore().getUser()?.xmtpCryptedPrivateKey
    if (!cryptedKey) throw new Error('no cryptedKey')
    const wallet = new ethers.Wallet(decryptKey(cryptedKey, passPhrase.value))
    const privateKey = wallet.privateKey
    useKeyDecrypt().setDecryptedKey(privateKey)
  } catch (err) {
    passPhraseErrorMessage.value = 'Decrypted key is not assigned to a wallet, your pass phrase may be wrong'
  }
}

const passPhraseHasError = () => {}
</script>

<style lang="scss" scoped></style>
