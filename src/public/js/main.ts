import Vue from "vue";

import ApplyHtmlHacks from "./HtmlHacks";
import { GetStatus, FindMe, SetMopMode, SetSweepMode, StartCleanup, PauseCleanup, GoHome } from "./Robot";
import { VacuumMode } from "../../common/VacuumMode";
import { VacuumState } from "../../common/VacuumState";

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

        vm.isCleaning = status.Result.IsCleaning;


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
        isMopMode: false,

        inCleaningUiVisibility: "collapse",
        sweepingModeVisibility: "collapse",
        moppingModeVisibility: "collapse",

        chargingStateDisplay: "none",
        cleaningStateDisplay: "none",
        pausedStateDisplay: "none"
    },
    watch: {
        isCleaning: function (val) {
            this.inCleaningUiVisibility = val ? "visible" : "collapse";
            this.sweepingModeVisibility = (val && this.isSweepMode) ? "visible" : "collapse";
            this.moppingModeVisibility = (val && this.isMopMode) ? "visible" : "collapse";
        },
        state: function (state) {
            switch (state as VacuumState) {
                case VacuumState.Charging:
                    this.chargingStateDisplay = "block";
                    this.cleaningStateDisplay = "none";
                    this.pausedStateDisplay = "none";
                    break;
                case VacuumState.Cleaning:
                    this.chargingStateDisplay = "none";
                    this.cleaningStateDisplay = "block";
                    this.pausedStateDisplay = "none";
                    break;
                case VacuumState.Paused:
                    this.chargingStateDisplay = "none";
                    this.cleaningStateDisplay = "none";
                    this.pausedStateDisplay = "block";
                    break;
                default:
                    break;
            }
        }
    },
    methods: {
        findMe: function () {
            FindMe();
            window.focus();
            try {
                (document.activeElement as HTMLElement).blur();
            } catch (error) { }
        },
        setSweepMode: async function () {
            await SetSweepMode();
            RefreshStatus();
        },
        setMopMode: async function () {
            await SetMopMode();
            RefreshStatus();
        },
        startCleanup: async function () {
            await StartCleanup();
            RefreshStatus();
        },
        pauseCleanup: async function () {
            await PauseCleanup();
            RefreshStatus();
        },
        goHome: async function () {
            await GoHome();
            RefreshStatus();
        },
    }
});
