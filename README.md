# NodeJs + Graphql + MongoDB

## 1. 내용

> 환율 정보에 대하여 DB로부터 간단히 CRUD 기능구현

## 2. 적용기술

> NodeJs(Express), Graphql, Typescript, MongoDB(mongoose)

## 3. 설정 및 실행방법

(1) repo 복사

`git clone https://github.com/mementomoriCarpediem/nodeJsGraphqlMongoDB.git`

(2) 폴더 이동 및 yarn install

`cd nodeJsGraphqlMongoDB && yarn install`

(3) 서버 실행

> 참고사항 : PORT 번호는 5110으로 설정되어 있으며, .env파일에서 수정가능

`yarn start`

(4) 환율 데이터 생성 테스트

- 초기 DB 테이블에는 데이터가 없음

[예시] - curl
`curl -XPOST "http://localhost:5110/graphql" --silent \ -H "accept: application/json" \ -H "Content-Type: application/json" \ -d ' { "query": "mutation { postExchangeRate (info: { src: \"usd\", tgt: \"krw\", rate: 1342.11, date:\"2022-11-28\" }) { src tgt rate date } }" } '`

(5) 환율 데이터 조회 테스트

[예시] - curl
`curl -XPOST "http://localhost:5110/graphql" --silent \ -H "accept: application/json" \ -H "Content-Type: application/json" \ -d ' { "query": "query { getExchangeRate (src: \"krw\", tgt: \"usd\") { src tgt rate date } }" } '`

(6) 환율 데이터 삭제 테스트

[예시] - curl
`curl -XPOST "http://localhost:5110/graphql" --silent \ -H "accept: application/json" \ -H "Content-Type: application/json" \ -d ' { "query": "query { getExchangeRate (src: \"krw\", tgt: \"krw\") { src tgt rate date } }" } '`
