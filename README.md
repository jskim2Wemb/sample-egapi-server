# ECharts & Tabulator API Server

Node.js 기반 ECharts 차트 데이터 및 Tabulator 테이블 데이터 제공 API 서버

## 프로젝트 구조

```
echarts-api-server/
├── package.json          # 프로젝트 의존성
├── server.js            # 메인 서버 파일
├── .env                 # 환경 변수 (생성 필요)
├── src/
│   ├── routes/          # API 라우트
│   │   ├── index.js
│   │   ├── lineChart.js
│   │   ├── barChart.js
│   │   ├── combinedChart.js
│   │   ├── pieChart.js
│   │   ├── realtime.js
│   │   └── tabulatorTable.js
│   ├── utils/           # 유틸리티 함수
│   │   └── dataGenerator.js
│   └── middleware/      # 미들웨어
│       └── errorHandler.js
└── client/              # 클라이언트 예제
    ├── example.html
    └── tabulator-example.html
```

## 시스템 요구사항

- **Node.js**: 14.0.0 이상 (권장: 14.21.3)
- **npm**: 6.0.0 이상
- **테스트 환경**: Node.js 14.21.3, npm 6.14.18
- **주요 의존성**: Express 4.18.2, dotenv 16.x

## 설치 및 실행

### Node.js 버전 관리

이 프로젝트는 `.nvmrc` 파일을 사용하여 Node.js 버전을 관리합니다:

```bash
# nvm 설치 (macOS/Linux)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash

# nvm 설치 (Windows)
# https://github.com/coreybutler/nvm-windows/releases 에서 다운로드

# 프로젝트 디렉토리에서 Node.js 버전 자동 전환
nvm use

# 또는 특정 버전 설치 및 사용
nvm install 14.21.3
nvm use 14.21.3
```

### 프로젝트 설치 및 실행

```bash
# 의존성 설치
npm install

# 개발 모드 실행 (자동 재시작)
npm run dev

# 프로덕션 모드 실행
npm start
```

## API 엔드포인트

### 📊 Chart APIs

#### 1. Line Chart
```
GET /api/line-chart?days=30&series=2
```

#### 2. Bar Chart
```
GET /api/bar-chart?categories=Jan,Feb,Mar,Apr,May,Jun&series=2
```

#### 3. Combined Chart
```
GET /api/combined-chart?months=12
```

#### 4. Pie Chart
```
GET /api/pie-chart?categories=5&includeValue=true
GET /api/pie-chart/donut?categories=5
GET /api/pie-chart/category/department
GET /api/pie-chart/category/region
GET /api/pie-chart/category/product
GET /api/pie-chart/category/status
GET /api/pie-chart/category/priority
GET /api/pie-chart/sample
POST /api/pie-chart/custom
Body: {
  "categories": 5,
  "includeValue": true,
  "minValue": 100,
  "maxValue": 1000,
  "categoryNames": ["Custom A", "Custom B", "Custom C"]
}
```

#### 5. Real-time Data
```
GET /api/realtime
GET /api/realtime/stream (Server-Sent Events)
```

#### 6. Custom Chart
```
POST /api/custom-chart
Body: {
  "chartType": "line",
  "dataPoints": 10,
  "seriesCount": 2
}
```

### 📋 Table APIs

#### 6. Tabulator Table
```
GET /api/tabulator-table?rows=50&columns=5
```

#### 7. Sample Table Data
```
GET /api/tabulator-table/sample
```

#### 8. Large Dataset
```
GET /api/tabulator-table/large?rows=1000
```

#### 9. Custom Table Data
```
POST /api/tabulator-table/custom
Body: {
  "rows": 50,
  "columns": 5,
  "includeId": true,
  "includeName": true,
  "includeAge": true,
  "includeDepartment": true,
  "includeSalary": true,
  "includeEmail": true,
  "includeStatus": true,
  "includeJoinDate": true
}
```

## 클라이언트 예제

브라우저에서 다음 주소로 접속:

### 📊 ECharts 예제
```
http://localhost:3000/client/example.html
```

### 📋 Tabulator Table 예제
```
http://localhost:3000/client/tabulator-example.html
```

### 🥧 Pie Chart 예제
```
http://localhost:3000/client/pie-chart-example.html
```

## 데이터 구조

### 📊 Chart Data
- Line Chart: 시계열 데이터 (날짜, 값)
- Bar Chart: 카테고리별 데이터 (카테고리, 값)
- Combined Chart: 복합 차트 데이터 (라인 + 바)
- Pie Chart: 비율 데이터 (카테고리, 값, 퍼센티지)
  - 기본 파이 차트: 동적 카테고리 수 지원
  - 도넛 차트: 중앙 텍스트 포함
  - 카테고리별: 부서, 지역, 제품, 상태, 우선순위
- Real-time: 실시간 업데이트 데이터

### 📋 Table Data
- Employee 정보 기반 테이블 데이터
- 컬럼: ID, Name, Age, Department, Salary, Email, Status, JoinDate
- 동적 행/열 수 지원
- 커스텀 컬럼 생성 가능

## 데이터베이스 연동

현재는 랜덤 데이터를 생성하지만, 실제 사용 시에는 각 라우트 파일에서 데이터베이스 쿼리로 교체하면 됩니다:

```javascript
// 예시: src/routes/lineChart.js
const db = require('../db'); // 데이터베이스 모듈

router.get('/', async (req, res) => {
  const data = await db.query('SELECT * FROM sales_data');
  // 데이터 처리 및 응답
});
```

```javascript
// 예시: src/routes/tabulatorTable.js
const db = require('../db'); // 데이터베이스 모듈

router.get('/', async (req, res) => {
  const data = await db.query('SELECT * FROM employees LIMIT ?', [rows]);
  // 데이터 처리 및 응답
});
```

## 개발 가이드

### Node.js 버전 확인

```bash
# 현재 Node.js 및 npm 버전 확인
npm run check-node

# package.json engines 필드와 비교 확인
npm run check-engines

# 또는 직접 확인
node -v
npm -v

# nvm으로 프로젝트 버전 사용
nvm use
```

### 프로젝트 구조 가이드

- `src/routes/`: API 엔드포인트 정의
- `src/utils/`: 공통 유틸리티 함수
- `src/middleware/`: Express 미들웨어
- `client/`: 클라이언트 예제 파일

### 새로운 API 추가 방법

1. `src/routes/` 디렉토리에 새 라우트 파일 생성
2. `src/routes/index.js`에 새 라우트 등록
3. `server.js`의 엔드포인트 목록 업데이트
4. README.md에 API 문서 추가

### Pie Chart API 사용 예시

```javascript
// 기본 파이 차트
fetch('/api/pie-chart?categories=5&includeValue=true')
  .then(response => response.json())
  .then(data => {
    console.log('Pie Chart Data:', data);
  });

// 도넛 차트 (중앙 텍스트 포함)
fetch('/api/pie-chart/donut?categories=6')
  .then(response => response.json())
  .then(data => {
    console.log('Donut Chart Data:', data);
    console.log('Center Text:', data.centerText);
  });

// 카테고리별 파이 차트
fetch('/api/pie-chart/category/region')
  .then(response => response.json())
  .then(data => {
    console.log('Region Pie Chart:', data);
  });
```

### 환경 변수 설정

`.env` 파일을 생성하여 환경 변수를 설정할 수 있습니다:

```env
PORT=3000
NODE_ENV=development
```

## 라이선스

MIT License 