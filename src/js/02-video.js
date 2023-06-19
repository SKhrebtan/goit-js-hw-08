import Vimeo from '@vimeo/player';
import throttle from 'lodash.throttle';
import { save, load, remove } from './storage'

const TIMECODE_KEY = "videoplayer-current-time";
const iframe = document.querySelector('#vimeo-player');
const player = new Vimeo(iframe);  

player.setCurrentTime(Number(load(TIMECODE_KEY)));
 
const onTimeUpdateToStorage = function (data) {
    console.log( JSON.stringify(data.seconds))
    save(TIMECODE_KEY, data.seconds);
}

player.on('timeupdate', throttle(onTimeUpdateToStorage, 1000));

