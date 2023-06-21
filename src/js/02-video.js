import Vimeo from '@vimeo/player';
import throttle from 'lodash.throttle';
import { save, load, remove } from './storage'

const TIMECODE_KEY = "videoplayer-current-time";
const iframe = document.querySelector('#vimeo-player');
const player = new Vimeo(iframe);  

player.setCurrentTime(load(TIMECODE_KEY) || 0);
 
const onTimeUpdateToStorage = function ({ seconds }) {
    console.log(JSON.stringify(seconds));
    save(TIMECODE_KEY, seconds);
}

player.on('timeupdate', throttle(onTimeUpdateToStorage, 1000));

