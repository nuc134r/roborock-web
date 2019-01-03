import Vue from "vue";

import ApplyHtmlHacks from "./HtmlHacks";
import { GetStatus } from "./Robot";
import { VacuumMode } from "../../common/VacuumMode";

document.addEventListener("DOMContentLoaded", DomLoaded);

async function DomLoaded() {
    ApplyHtmlHacks();
    RefreshStatus();
}

async function RefreshStatus() {
    const status = await GetStatus();
    if (!status.Error) {
        vm.battery = status.Result.Battery;
        vm.area = Math.floor(status.Result.SessionCleaningArea / 1000000); // to m2
        vm.time = Math.floor(status.Result.SessionCleaningTime / 60); // to minutes
        vm.state = status.Result.State;

        vm.isCleaning = status.Result.IsCleaning;

        switch (status.Result.Mode) {
            case VacuumMode.Max:
            case VacuumMode.Power:
            case VacuumMode.Quiet:
            case VacuumMode.Standard:
                vm.isSweepMode = true;
                vm.isMopMode = false;
                break;
            case VacuumMode.Mop:
                vm.isSweepMode = false;
                vm.isMopMode = true;
                break;
        }
    } else {
        alert(status.Error.Error);
    }
}

const vm = new Vue({
    el: "#root",
    data: {
        message: "Hello from Vue!",
        battery: 0,
        area: 0,
        time: 0,
        state: 0,

        isCleaning: false,
        isSweepMode: false,
        isMopMode: false
    },
    computed: {
        sweepingModeVisibility: function() {
           return (this.isCleaning && this.isSweepMode) ? "visible" : "collapsed" ;
        },
        moppingModeVisibility: function() {
           return (this.isCleaning && this.isMopMode) ? "visible" : "collapsed" ;
        },
        inCleaningUiVisibility: function() {
           return this.isCleaning ? "visible" : "collapsed" ;
        }
     }
});
