import * as alt from 'alt';
import * as game from 'natives';

let iplLoad = [
    "rc12b_default",
    "rc12b_hospitalinterior",
    "apa_v_mp_h_01_a",
    "apa_v_mp_h_01_c",
    "apa_v_mp_h_01_b",
    "apa_v_mp_h_02_a",
    "apa_v_mp_h_02_c",
    "apa_v_mp_h_02_b",
    "apa_v_mp_h_03_a",
    "apa_v_mp_h_03_c",
    "apa_v_mp_h_03_b",
    "apa_v_mp_h_04_a",
    "apa_v_mp_h_04_c",
    "apa_v_mp_h_04_b",
    "apa_v_mp_h_05_a",
    "apa_v_mp_h_05_c",
    "apa_v_mp_h_05_b",
    "apa_v_mp_h_06_a",
    "apa_v_mp_h_06_c",
    "apa_v_mp_h_06_b",
    "apa_v_mp_h_07_a",
    "apa_v_mp_h_07_c",
    "apa_v_mp_h_07_b",
    "apa_v_mp_h_08_a",
    "apa_v_mp_h_08_c",
    "apa_v_mp_h_08_b",
    "shr_int",
    "TrevorsTrailerTrash",
    "post_hiest_unload",
    "refit_unload",
    "FINBANK",
    "Coroner_Int_on",
    "coronertrash",
    "CS1_02_cf_onmission1",
    "CS1_02_cf_onmission2",
    "CS1_02_cf_onmission3",
    "CS1_02_cf_onmission4",
    "farm",
    "farmint",
    "farm_lod",
    "farm_props",
    "des_farmhouse",
    "FIBlobby",
    "FruitBB",
    "sc1_01_newbill",
    "hw1_02_newbill",
    "hw1_emissive_newbill",
    "sc1_14_newbill",
    "dt1_17_newbill",
    "id2_14_during_door",
    "id2_14_during1",
    "facelobby",
    "v_tunnel_hole",
    "Carwash_with_spinners",
    "sp1_10_real_interior",
    "sp1_10_real_interior_lod",
    "ch1_02_open",
    "bkr_bi_id1_23_door",
    "lr_cs6_08_grave_closed",
    "methtrailer_grp1",
    "bkr_bi_hw1_13_int",
    "CanyonRvrShallow",
    "CS3_07_MPGates",
    "bh1_47_joshhse_unburnt",
    "bh1_47_joshhse_unburnt_lod",
    "cs3_05_water_grp1",
    "cs3_05_water_grp1_lod",
    "cs3_05_water_grp2",
    "cs3_05_water_grp2_lod",
    "canyonriver01",
    "canyonriver01_lod",
    "ch3_rd2_bishopschickengraffiti",
    "cs5_04_mazebillboardgraffiti",
    "cs5_roads_ronoilgraffiti",
    "hei_carrier",
    "hei_carrier_distantlights",
    "hei_Carrier_int1",
    "hei_Carrier_int2",
    "hei_Carrier_int3",
    "hei_Carrier_int4",
    "hei_Carrier_int5",
    "hei_Carrier_int6",
    "hei_carrier_lodlights",
    "hei_carrier_slod",
    "hei_yacht_heist",
    "hei_yacht_heist_Bar",
    "hei_yacht_heist_Bedrm",
    "hei_yacht_heist_Bridge",
    "hei_yacht_heist_DistantLights",
    "hei_yacht_heist_enginrm",
    "hei_yacht_heist_LODLights",
    "hei_yacht_heist_Lounge",
    "ex_dt1_02_office_01b",
    "ex_dt1_11_office_01b",
    "ex_sm_13_office_01b",
    "ex_sm_15_office_01b",
    "bkr_biker_interior_placement_interior_0_biker_dlc_int_01_milo",
    "bkr_biker_interior_placement_interior_1_biker_dlc_int_02_milo",
    "bkr_biker_interior_placement_interior_2_biker_dlc_int_ware01_milo",
    "bkr_biker_interior_placement_interior_2_biker_dlc_int_ware02_milo",
    "bkr_biker_interior_placement_interior_2_biker_dlc_int_ware03_milo",
    "bkr_biker_interior_placement_interior_2_biker_dlc_int_ware04_milo",
    "bkr_biker_interior_placement_interior_2_biker_dlc_int_ware05_milo",
    "bkr_biker_interior_placement_interior_3_biker_dlc_int_ware02_milo",
    "bkr_biker_interior_placement_interior_4_biker_dlc_int_ware03_milo",
    "bkr_biker_interior_placement_interior_5_biker_dlc_int_ware04_milo",
    "bkr_biker_interior_placement_interior_6_biker_dlc_int_ware05_milo",
    "ex_exec_warehouse_placement_interior_1_int_warehouse_s_dlc_milo",
    "ex_exec_warehouse_placement_interior_0_int_warehouse_m_dlc_milo",
    "ex_exec_warehouse_placement_interior_2_int_warehouse_l_dlc_milo",
    "imp_impexp_interior_placement",
    "imp_impexp_interior_placement_interior_0_impexp_int_01_milo_",
    "imp_impexp_interior_placement_interior_1_impexp_intwaremed_milo_",
    "imp_impexp_interior_placement_interior_2_imptexp_mod_int_01_milo_",
    "imp_impexp_interior_placement_interior_3_impexp_int_02_milo_",
    "imp_dt1_02_modgarage",
    "imp_dt1_02_cargarage_a",
    "imp_dt1_02_cargarage_b",
    "imp_dt1_02_cargarage_c",
    "imp_dt1_11_modgarage",
    "imp_dt1_11_cargarage_a",
    "imp_dt1_11_cargarage_b",
    "imp_dt1_11_cargarage_c",
    "imp_sm_13_modgarage",
    "imp_sm_13_cargarage_a",
    "imp_sm_13_cargarage_b",
    "imp_sm_13_cargarage_c",
    "imp_sm_15_modgarage",
    "imp_sm_15_cargarage_a",
    "imp_sm_15_cargarage_b",
    "imp_sm_15_cargarage_c",
    "gr_case0_bunkerclosed",
    "gr_case1_bunkerclosed",
    "gr_case2_bunkerclosed",
    "gr_case3_bunkerclosed",
    "gr_case4_bunkerclosed",
    "gr_case5_bunkerclosed",
    "gr_case6_bunkerclosed",
    "gr_case7_bunkerclosed",
    "gr_case9_bunkerclosed",
    "gr_case10_bunkerclosed",
    "gr_case11_bunkerclosed",
    "xm_siloentranceclosed_x17",
    "sm_smugdlc_interior_placement",
    "sm_smugdlc_interior_placement_interior_0_smugdlc_int_01_milo_",
    "xm_x17dlc_int_placement",
    "xm_x17dlc_int_placement_interior_0_x17dlc_int_base_ent_milo_",
    "xm_x17dlc_int_placement_interior_1_x17dlc_int_base_loop_milo_",
    "xm_x17dlc_int_placement_interior_2_x17dlc_int_bse_tun_milo_",
    "xm_x17dlc_int_placement_interior_3_x17dlc_int_base_milo_",
    "xm_x17dlc_int_placement_interior_4_x17dlc_int_facility_milo_",
    "xm_x17dlc_int_placement_interior_5_x17dlc_int_facility2_milo_",
    "xm_x17dlc_int_placement_interior_6_x17dlc_int_silo_01_milo_",
    "xm_x17dlc_int_placement_interior_7_x17dlc_int_silo_02_milo_",
    "xm_x17dlc_int_placement_interior_8_x17dlc_int_sub_milo_",
    "xm_x17dlc_int_placement_interior_9_x17dlc_int_01_milo_",
    "xm_x17dlc_int_placement_interior_10_x17dlc_int_tun_straight_milo_",
    "xm_x17dlc_int_placement_interior_11_x17dlc_int_tun_slope_flat_milo_",
    "xm_x17dlc_int_placement_interior_12_x17dlc_int_tun_flat_slope_milo_",
    "xm_x17dlc_int_placement_interior_13_x17dlc_int_tun_30d_r_milo_",
    "xm_x17dlc_int_placement_interior_14_x17dlc_int_tun_30d_l_milo_",
    "xm_x17dlc_int_placement_interior_15_x17dlc_int_tun_straight_milo_",
    "xm_x17dlc_int_placement_interior_16_x17dlc_int_tun_straight_milo_",
    "xm_x17dlc_int_placement_interior_17_x17dlc_int_tun_slope_flat_milo_",
    "xm_x17dlc_int_placement_interior_18_x17dlc_int_tun_slope_flat_milo_",
    "xm_x17dlc_int_placement_interior_19_x17dlc_int_tun_flat_slope_milo_",
    "xm_x17dlc_int_placement_interior_20_x17dlc_int_tun_flat_slope_milo_",
    "xm_x17dlc_int_placement_interior_21_x17dlc_int_tun_30d_r_milo_",
    "xm_x17dlc_int_placement_interior_22_x17dlc_int_tun_30d_r_milo_",
    "xm_x17dlc_int_placement_interior_23_x17dlc_int_tun_30d_r_milo_",
    "xm_x17dlc_int_placement_interior_24_x17dlc_int_tun_30d_r_milo_",
    "xm_x17dlc_int_placement_interior_25_x17dlc_int_tun_30d_l_milo_",
    "xm_x17dlc_int_placement_interior_26_x17dlc_int_tun_30d_l_milo_",
    "xm_x17dlc_int_placement_interior_27_x17dlc_int_tun_30d_l_milo_",
    "xm_x17dlc_int_placement_interior_28_x17dlc_int_tun_30d_l_milo_",
    "xm_x17dlc_int_placement_interior_29_x17dlc_int_tun_30d_l_milo_",
    "xm_x17dlc_int_placement_interior_30_v_apart_midspaz_milo_",
    "xm_x17dlc_int_placement_interior_31_v_studio_lo_milo_",
    "xm_x17dlc_int_placement_interior_32_v_garagem_milo_",
    "xm_x17dlc_int_placement_interior_33_x17dlc_int_02_milo_",
    "xm_x17dlc_int_placement_interior_34_x17dlc_int_lab_milo_",
    "xm_x17dlc_int_placement_interior_35_x17dlc_int_tun_entry_milo_",
    "xm_x17dlc_int_placement_strm_0",
    "xm_bunkerentrance_door",
    "xm_hatch_01_cutscene",
    "xm_hatch_02_cutscene",
    "xm_hatch_03_cutscene",
    "xm_hatch_04_cutscene",
    "xm_hatch_06_cutscene",
    "xm_hatch_07_cutscene",
    "xm_hatch_08_cutscene",
    "xm_hatch_09_cutscene",
    "xm_hatch_10_cutscene",
    "xm_hatch_closed",
    "xm_hatches_terrain",
    "xm_hatches_terrain_lod",
    "xm_mpchristmasadditions",
    "hei_dlc_windows_casino",
    "hei_dlc_casino_door",
    "vw_dlc_casino_door",
    "hei_dlc_casino_aircon",
    "vw_casino_main",
    "vw_casino_garage",
    "vw_casino_carpark",
    "vw_casino_penthouse"
]

alt.on('connectionComplete', () => {
    for (let i = 0; i < iplLoad.length; i++) {
        alt.requestIpl(iplLoad[i]);
    }
})

// Police station
let interior = game.getInteriorAtCoords(440.84, -983.14, 30.69);
game.pinInteriorInMemory(interior);

//Jewelry
game.removeIpl("bh1_16_refurb");
game.removeIpl("jewel2fake");

let phPropList = [
    "Set_Pent_Tint_Shell",
    "Set_Pent_Pattern_01",
    "Set_Pent_Spa_Bar_Open",
    "Set_Pent_Media_Bar_Open",
    "Set_Pent_Dealer",
    "Set_Pent_Arcade_Retro",
    "Set_Pent_Bar_Clutter",
    "Set_Pent_Clutter_01",
    "set_pent_bar_light_01",
    "set_pent_bar_party_0"
];

for (const propName of phPropList) {
    game.activateInteriorEntitySet(274689, propName);
    game.setInteriorEntitySetColor(274689, propName, 1)
}
game.refreshInterior(274689)

/* SIMEON */
alt.requestIpl('shr_int');
game.activateInteriorEntitySet(game.getInteriorAtCoordsWithType(-38.62, -1099.01, 27.31, 'v_carshowroom'), 'csr_beforeMission');
game.activateInteriorEntitySet(game.getInteriorAtCoordsWithType(-38.62, -1099.01, 27.31, 'v_carshowroom'), 'shutter_closed');