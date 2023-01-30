export const ImgModel = () => ({
  licenseSchoolPermitPhotoUrl: '', //办学许可证照片
  licenseCreditPhotoUrl: '', //营业执照照片(民办非企证照片)
  fireCertPhotoUrl: '', //消防资质照片
  sportsCertPhotoUrl: '', //体育经营许可证照片
  headmasterPhotoUrl: '' //校长照片
})

type ModelType = '02' | '03' | '04'

export const Model = () => ({
  type: '02' as ModelType, // 主体类型 03 -- 企业 04 -- 民办非企
  licenseCreditPhoto: '', //营业执照(民办非企证)
  licenseSchoolPermitPhoto: '', //办学资质
  fireCertPhoto: '', //消防资质
  sportsCertPhoto: '', //体育经营许可证
  area: '', //校区面积
  holdCount: '', //最大容量人数
  security: '', //安全保障
  environmentPhotos: [] as string[], // 校区环境
  insureCompany: '', // 保险公司
  insureGoodName: '', // 保险产品名称
  insureStartTime: '', // 保险开始时间
  insureEndTime: '', // 保险结束时间
  insurePolicyImgs: [] as string[], // 保险照片
  fullTimeEmployeeCount: '', //全职教师
  partTimeEmployeeCount: '', //兼职教师
  hireK12: true, //是否聘用中小学教师
  headmaster: '', //校长
  headmasterBirthday: '', //校长出生日期
  headmasterEducation: '', //校长职称/学历
  headmasterExperience: '', //校长教育经验
  headmasterPhoto: '', //校长照片
  buildTime: '', //创建时间
  businessStartHours: '', //营业开始时间
  businessEndHours: '', //营业结束时间
  businessInfo: [
    '不组织学科竞赛',
    '教学内容不超过相应的国家课程标准',
    '不布置繁重的课后作业',
    '教学进度不超过所在县区中小学同期进度',
    '晚上8：30分之前结束教学活动',
    '不得一次性收取时间跨度超过3个月的学费'
  ], //经营项目
  pass: true, //实校验证是否通过
  checkStartTime: '',
  checkEndTime: ''
})

export const infoList = [
  '不组织学科竞赛',
  '教学内容不超过相应的国家课程标准',
  '不布置繁重的课后作业',
  '教学进度不超过所在县区中小学同期进度',
  '晚上8：30分之前结束教学活动',
  '不得一次性收取时间跨度超过3个月的学费'
]

export const rules = {
  licenseCreditPhoto: [
    { required: true, message: '请上传营业执照(民办非企证)', trigger: 'change' }
  ],
  businessStartHours: [{ required: true, message: '请选择营业开始时间', trigger: 'change' }],
  businessEndHours: [{ required: true, message: '请选择营业结束时间', trigger: 'change' }],
  checkStartTime: [{ required: true, message: '请选择校验时间', trigger: 'change' }],
  checkEndTime: [{ required: true, message: '请选择到期时间', trigger: 'change' }]
}
