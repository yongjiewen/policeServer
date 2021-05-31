/*
Navicat MySQL Data Transfer

Source Server         : localhost
Source Server Version : 50524
Source Host           : localhost:3306
Source Database       : test

Target Server Type    : MYSQL
Target Server Version : 50524
File Encoding         : 65001

Date: 2021-05-30 17:36:20
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for info_copy1
-- ----------------------------
DROP TABLE IF EXISTS `info_copy1`;
CREATE TABLE `info_copy1` (
  `id` int(255) NOT NULL AUTO_INCREMENT,
  `coll_time` datetime DEFAULT NULL COMMENT '采集时间',
  `data_sources` varchar(255) COLLATE utf8_bin DEFAULT NULL COMMENT '数据来源',
  `scams_type` varchar(255) COLLATE utf8_bin DEFAULT NULL COMMENT '诈骗类型',
  `unit` varchar(255) COLLATE utf8_bin DEFAULT NULL COMMENT '预警单位',
  `phone` varchar(255) COLLATE utf8_bin DEFAULT NULL COMMENT '预警手机',
  `lelver` varchar(255) COLLATE utf8_bin DEFAULT NULL COMMENT '预警级别(1:高危,2:高,3:中,4:低)',
  `related_info` varchar(255) COLLATE utf8_bin DEFAULT NULL COMMENT '关联信息',
  `warning_status` varchar(255) COLLATE utf8_bin DEFAULT NULL COMMENT '预警状态',
  `is_meet` varchar(255) COLLATE utf8_bin DEFAULT NULL COMMENT '是否见面（0：否，1：是）',
  `is_deceived` varchar(255) COLLATE utf8_bin DEFAULT NULL COMMENT '是否被骗（0：否，1：是）',
  `is_phone` varchar(255) COLLATE utf8_bin DEFAULT NULL COMMENT '是否照相（0：否，1：是）',
  `storage_time` varchar(255) COLLATE utf8_bin DEFAULT NULL COMMENT '入库时间',
  `release_time` varchar(255) COLLATE utf8_bin DEFAULT NULL COMMENT '下发时间',
  `remark` varchar(255) COLLATE utf8_bin DEFAULT NULL COMMENT '备注',
  `nickname` varchar(255) COLLATE utf8_bin DEFAULT NULL COMMENT '操作员',
  `isDelete` int(255) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
