# ECharts API Server

Node.js 기반 ECharts 차트 데이터 제공 API 서버

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
│   │   └── realtime.js
│   ├── utils/           # 유틸리티 함수
│   │   └── dataGenerator.js
│   └── middleware/      # 미들웨어
│       └── errorHandler.js
└── client/              # 클라이언트 예제
    └── example.html
```

## 설치 및 실행

```bash
# 의존성 설치
npm install

# 개발 모드 실행 (자동 재시작)
npm run dev

# 프로덕션 모드 실행
npm start
```

## API 엔드포인트

### 1. Line Chart
```
GET /api/line-chart?days=30&series=2
```

### 2. Bar Chart
```
GET /api/bar-chart?categories=Jan,Feb,Mar,Apr,May,Jun&series=2
```

### 3. Combined Chart
```
GET /api/combined-chart?months=12
```

### 4. Real-time Data
```
GET /api/realtime
GET /api/realtime/stream (Server-Sent Events)
```

### 5. Custom Chart
```
POST /api/custom-chart
Body: {
  "chartType": "line",
  "dataPoints": 10,
  "seriesCount": 2
}
```

## 클라이언트 예제

브라우저에서 다음 주소로 접속:
```
http://localhost:3000/client/example.html
```

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