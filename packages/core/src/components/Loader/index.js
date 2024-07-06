// components/Loader.js
import React from 'react'
import { View, ActivityIndicator, Modal } from 'react-native'
import styles from './styles'

const Loader = ({ visible }) => (
  <Modal
    transparent
    animationType='none'
    visible={visible}
    onRequestClose={() => { console.log('close modal') }}
  >
    <View style={styles.modalBackground}>
      <View style={styles.activityIndicatorWrapper}>
        <ActivityIndicator animating={visible} />
      </View>
    </View>
  </Modal>
)

export default Loader
