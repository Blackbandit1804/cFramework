import * as alt from 'alt';
import * as game from 'natives';
import {drawMarker} from './Helper';
import {Markers} from '../../config/Markers';

alt.on('connectionComplete', () => {
    for (let i = 0; i < Markers.length; i++) {
        drawMarker(Markers[i].type,Markers[i].x,Markers[i].y,Markers[i].z,Markers[i].radius,Markers[i].r,Markers[i].g,Markers[i].b,Markers[i].alpha,0,1,0)
    }    
})
