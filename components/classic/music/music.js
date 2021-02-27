import {
  classicBehavior
} from '../classic-beh.js'

const mMgr = wx.getBackgroundAudioManager()

Component({
  behaviors: [classicBehavior],
  properties: {
    src: String,
    title: String
  },

  data: {
    playing: false,
    pauseSrc: 'images/player@pause.png',
    playSrc: 'images/player@play.png'
  },

  attached: function(event) {
    this._recoverStatus()
    this._monitorSwitch()
  },

  methods: {
    onPlay: function(event) {
      if (!this.data.playing) {
        this.setData({
          playing: true
        })
        mMgr.src = this.properties.src
      } else {
        this.setData({
          playing: false
        })
        mMgr.pause()
      }
    },

    _recoverStatus: function(event) {
      // mMgr.paused 音乐暂停了就为true
      if (mMgr.paused) {
        this.setData({
          playing: false
        })
        return
      }
      if (mMgr.src == this.properties.src) {
        this.setData({
          playing: true
        })
      }
    },

    // 监控 音乐控制开关 检测播放状态
    _monitorSwitch: function() {
      mMgr.onPlay(() => {
        this._recoverStatus()
      })
      mMgr.onPause(() => {
        this._recoverStatus()
      })
      mMgr.onStop(() => {
        this._recoverStatus()
      })
      mMgr.onEnded(() => {
        this._recoverStatus()
      })
    }
  }
})