---
title: "프로그래머스 월간 코드 챌린지 시즌2 4월"
categories: [cp-algorithm]
tags: [programmers]
---

### 참가후기

전체 8등을 했다. 지문이 간단하고 명확했고 무려 한국어였다(...). 항상 영어 지문을 잘못 해석해서 고생했던 나한테 유리했다. 국내에도 이렇게 좋은 대회가 생기다니 앞으로도 자주 참가해야겠다.

![](/2021-04-28-programmers-monthly-code-challenge-s2-april/screenshot1.png)

### A. 음양 더하기

몇 개의 정수들이 있다. 이 정수의 절대값을 나타내는 수열과 부호를 나타내는 boolean 배열이 주어진다. 이 때, 모든 정수의 합을 구하는 문제다.

`signs[]`를 보고 부호를 정해서 더하면 된다.

```cpp
#include <string>
#include <vector>

using namespace std;

int solution(vector<int> absolutes, vector<bool> signs) {
    int answer = 0;

    int n = (int)absolutes.size();
    for(int i=0;i<n;++i){
        if(signs[i]) answer += absolutes[i];
        else answer -= absolutes[i];
    }

    return answer;
}
```

### B. 괄호 회전하기

`()`, `[]`, `{}`로 이뤄진 괄호 문자열이 주어진다. 이를 왼쪽으로 $x$번 shift를 했을 때 올바른 괄호 문자열이 되는 $x$의 개수를 구하는 문제다.

괄호 문자열의 길이 $N$은 최대 $1000$으로 여유롭다. 모든 $x$에 대해 shift해서 올바른 괄호 문자열인지 판단하는데 $O(N)$이고 $N$개의 $x$에 대해 이를 반복하면 전체 $O(N^2)$에 해결할 수 있다.

```cpp
#include <string>
#include <vector>
#include <deque>
#include <stack>

using namespace std;

bool chk(deque<char> &dq){
    stack<char> s;
    for(int i=0;i<(int)dq.size();++i){
        if(dq[i]=='(') s.push(dq[i]);
        if(dq[i]=='[') s.push(dq[i]);
        if(dq[i]=='{') s.push(dq[i]);
        if(dq[i]==')'){
            if(s.empty() || s.top() != '(') return false;
            else s.pop();
        }
        if(dq[i]=='}'){
            if(s.empty() || s.top() != '{') return false;
            else s.pop();
        }
        if(dq[i]==']'){
            if(s.empty() || s.top() != '[') return false;
            else s.pop();
        }
    }
    return s.empty();
}

int solution(string s) {
    int answer = 0;

    int n = s.size();
    deque<char> dq;
    for(int i=0;i<n;++i)
        dq.emplace_back(s[i]);
    for(int i=0;i<n;++i){
        if(chk(dq)) answer++;
        dq.push_back(dq.front());
        dq.pop_front();
    }

    return answer;
}
```

### C. 모두 0으로 만들기

각 정점에 가중치가 있는 트리가 주어진다. 연결된 두 정점을 골라 한쪽을 $1$ 증가시키고 다른 한쪽을 $1$ 감소시키는 연산을 할 수 있다. 트리의 모든 정점의 가중치를 $0$으로 만들 수 있는지, 만들 수 있다면 최소 몇 번의 연산이 필요한지 구하는 문제다.

Greedy하게 해결할 수 있다. 어떤 리프 노드의 가중치가 $c$일 때 이를 $0$으로 만들고 parent에 $c$를 넘겨주면, 이 리프 노드를 제외한 트리를 $0$으로 만드는 또다른 부분 문제가 된다. 이 때 각 연산은 교환 법칙이 성립하기 때문에 $c$번의 연산만 하면 된다.

```cpp
#include <string>
#include <vector>

using namespace std;
using lint = long long;

int n;
lint b[300001];
vector<int> adj[300001];

lint go(int x,int p){
    lint ret = 0;
    for(auto to : adj[x])
        if(to != p)
            ret += go(to, x);
    ret += abs(b[x]);
    b[p] += b[x];
    return ret;
}

lint solution(vector<int> a, vector<vector<int>> edges) {
    n = a.size();
    for(int i=0;i<n;++i)
        b[i] = a[i];
    for(auto &e : edges){
        adj[e[0]].push_back(e[1]);
        adj[e[1]].push_back(e[0]);
    }
    lint ans = go(0,0);
    return b[0] == 0 ? ans : -1;
}
```

### D. RPG와 쿼리

$n$개의 정점과 $m$개의 간선으로 이뤄진 가중치 그래프와 상수 $z$가 주어진다. 매 턴마다 움직이지 않고 $z$원을 얻거나, 연결된 정점으로 가면서 가중치 값인 $w$원을 얻거나, 어떤 도시든 순간이동하고 $0$원을 얻을 수 있다. 각 쿼리마다 $c$가 주어지는데, 정확히 $c$원을 모을 수 있는지, 모을 수 있다면 최소 몇 턴이 필요한지 구하는 문제다.

Dynamic Programming으로 해결할 수 있다. 다음과 같이 정의해보자.

    $dp[i][j]$ = $i$번 정점에 도달했을 때 $j$원을 들고 있는 경우, 필요한 최소 턴수

$i$는 최대 $3000$이지만 $j$는 최대 ${10}^{18}$이기 때문에 불가능하다. 대신 몇 가지 관찰을 통해 두 번째 차원의 크기를 줄일 수 있다. 정점을 적당히 이동하던 중에 모아야할 돈이 $z$의 배수만큼 남았다면 그 정점에 계속 있으면 된다. 모든 $w$는 $z$보다 작기 때문에 경로를 먼저 이동하면서 $x = c \ (\mathrm{mod} \ z)$인 $x$원을 모은 뒤, $z$원을 반복적으로 모으는 순서로 강제하자.

이제, 각 정점에서 도달할 때 $x = c \ (\mathrm{mod} \ z)$인 $x$원을 들고 있는 경우, 필요한 최소 턴 수만 구하면 된다. 여기서 또 하나의 관찰을 할 수 있는데, 여기 필요한 최소 턴 수는 $50$을 넘지 않는다. 턴 수가 $50$이 넘는다면 비둘기집 원리에 의해 $\mathrm{mod} \ z$한 값이 같은 순간이 두 번 존재하게 된다. 그 사이에서 $z+\cdots+z$ 원 만큼 얻은 것이므로 생략할 수 있기 때문이다. 따라서 $50$원 이하의 돈을 최대 $50$번 벌 수 있으므로 $dp[3000][50 \cdot 50]$이면 충분하다.

$2500$개의 상태마다 모든 간선을 돌면서 업데이트 해주면 되므로 $O((n+m) \cdot 2500)$에 dp 테이블을 채울 수 있다. 마지막으로 $mn[i] = \min (dp[0 \sim n-1][i])$로 전처리하면 각 쿼리를 $O(1)$에 답할 수 있다.

```cpp
#include <string>
#include <cstdlib>
#include <cstring>
#include <vector>
void mmn(long long &x,long long y){ if(x==-1 || x>y) x = y; }

using namespace std;

int w[3000][3000];
vector<int> rev[3000];

long long dp[3000][2501], mn[2501];

vector<long long> solution(int n, int z, vector<vector<int>> roads, vector<long long> queries) {
    for(auto e : roads){
        rev[e[1]].push_back(e[0]);
        w[e[0]][e[1]] = e[2];
    }

    // solve
    memset(mn, -1, sizeof(mn));
    memset(dp, -1, sizeof(dp));
    mn[0] = dp[0][0] = 0;
    for(int i=1;i<n;++i) dp[i][0] = 1;
    for(int p=1;p<2501;++p){
        for(int i=0;i<n;++i)
            for(auto from : rev[i])
                if(p - w[from][i]>=0 && dp[from][p - w[from][i]]!=-1)
                    mmn(dp[i][p], dp[from][p - w[from][i]] + 1);

        if(p>=z && mn[p-z]!=-1)
            mmn(mn[p], mn[p-z]+1);
        for(int i=0;i<n;++i)
            if(~dp[i][p]) mmn(mn[p], dp[i][p]);
        for(int i=0;i<n;++i)
            if(~mn[p]) mmn(dp[i][p], mn[p] + 1);
    }

    vector<long long> answer;
    for(auto q : queries){
        long long ans = -1;
        if(q < 2501) ans = mn[q];
        else{
            long long i = 2500;
            for(;~i;--i) if(i%z == q%z) break;
            if(~mn[i]) ans = (q-i)/z + mn[i];
        }
        answer.push_back(ans);
    }
    return answer;
}
```
