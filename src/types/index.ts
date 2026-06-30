// 类型定义

export type LawLevel = '国际条约' | '法律' | '行政法规' | '部门规章' | '规范性文件' | '行业标准' | '地方性法规' | '地方政府规章';
export type LawCategory = '空域管理' | '运营资质' | '安全管理' | '文旅经营' | '应急处置' | '消费者权益保护' | '行政处罚与救济' | '国际公约';
export type LawScope = '国际' | '国家级' | '北京市';

export interface Law {
  id: string;
  title: string;
  level: LawLevel;
  category: LawCategory;
  scope: LawScope;
  issuingAuthority: string;
  effectiveDate: string;
  status: '现行有效' | '已修订' | '部分失效';
  keyArticles: string[];
  summary: string;
  tags: string[];
}

export interface BeijingRule {
  id: string;
  title: string;
  type: '禁飞区' | '限飞区' | '净空保护' | '文保限制' | '航线审批' | '景区管理';
  area: string;
  description: string;
  restrictions: string[];
  authority: string;
}

export interface CaseStudy {
  id: string;
  title: string;
  type: '行政处罚' | '消费纠纷' | '安全事故' | '合同纠纷' | '行政许可';
  date: string;
  location: string;
  parties: string;
  summary: string;
  legalBasis: string[];
  outcome: string;
  riskWarning: string;
}

export interface RiskItem {
  id: string;
  title: string;
  category: LawCategory;
  level: '高风险' | '中风险' | '低风险';
  description: string;
  legalBasis: string;
  mitigation: string[];
  frequency: '高频' | '中频' | '低频';
}

export interface ScreeningResult {
  passed: boolean;
  score: number;
  risks: {
    item: string;
    level: '高风险' | '中风险' | '低风险';
    detail: string;
    suggestion: string;
  }[];
  suggestions: string[];
}
