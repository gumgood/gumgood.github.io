---
layout: post
title: "Kickstart 2021 Round A"
description: "A~D번까지 업솔빙"
tags: [editorial]
---

### A. K-Goodness String

문자열 절반을 기준으로 서로 대칭이 아닌 쌍의 개수를 정확히 K개로 만들기 위해 최소 몇 개의 문자를 바꿔야하는지 출력하는 문제다.

현재 문자열에서 대칭이 아닌 쌍의 개수를 구하고, K와 얼마나 차이나는지 출력했다.

**배열 크기를 잘못잡아서 한 번 틀렸다.**

```cpp
#include<bits/stdc++.h>
using namespace std;
#define size(v) ((int)v.size())
#define all(v) (v).begin(),(v).end()
using lint = long long;
using fint = long double;
const lint INF = 1e9 + 9;

int n, k;
char s[200001];

int solve(){
    int cnt = 0;
    for(int i=0;i<n/2;++i)
        if(s[i] != s[n-1-i])
            cnt++;
    return abs(cnt - k);
}

int main(){
    int tc=1; scanf("%d",&tc);
    for(int tt=1;tt<=tc;++tt){
        scanf("%d%d%s",&n,&k,s);

        int ans = solve();
        printf("Case #%d: %d\n",tt,ans);
    }
}
```

### B. L Shaped Plots

0과 1로 이뤄진 R x C 그리드에서 L자 모양이 몇 개인지 구하는 문제다. L자는 두 선분이 끝 점에서 수직으로 만나는 형태를 말한다. 한 선분 길이는 다른 선분 길이의 두 배여야 하며, 각 선분의 길이는 2 이상이어야 한다.

각 위치에 대해 상하좌우에 몇 개의 1이 연속으로 있는지 전처리했다. L자가 가능한 8가지 모양에 대해 모두 처리했다.

**반복문 범위를 잘못 정해줘서 두 번 틀렸다.**

```cpp
#include<bits/stdc++.h>
using namespace std;
#define size(v) ((int)v.size())
#define all(v) (v).begin(),(v).end()
using lint = long long;
using fint = long double;
const lint INF = 1e9 + 9;

int n, m, a[1002][1002];

int u[1002][1002], d[1002][1002];
int l[1002][1002], r[1002][1002];

int solve(){
    for(int i=0;i<=n+1;++i)
        for(int j=0;j<=m+1;++j)
            l[i][j] = r[i][j] = u[i][j] = d[i][j] = 0;
    for(int i=1;i<=n;++i){
        for(int j=1;j<=m;++j){
            if(a[i][j]) l[i][j] = l[i][j-1]+1;
            else l[i][j] = 0;
        }
        for(int j=m;j;--j){
            if(a[i][j]) r[i][j] = r[i][j+1]+1;
            else r[i][j] = 0;
        }
    }
    for(int j=1;j<=m;++j){
        for(int i=1;i<=n;++i){
            if(a[i][j]) u[i][j] = u[i-1][j]+1;
            else u[i][j] = 0;
        }
        for(int i=n;i;--i){
            if(a[i][j]) d[i][j] = d[i+1][j]+1;
            else d[i][j] = 0;
        }    
    }
    int ans = 0;
    for(int i=1;i<=n;++i){
        for(int j=1;j<=m;++j){
            int v = min(u[i][j], l[i][j]/2);
            if(v>1) ans += v-1;
            v = min(u[i][j]/2, l[i][j]);
            if(v>1) ans += v-1;
            v = min(u[i][j], r[i][j]/2);
            if(v>1) ans += v-1;
            v = min(u[i][j]/2, r[i][j]);
            if(v>1) ans += v-1;
            v = min(d[i][j], r[i][j]/2);
            if(v>1) ans += v-1;
            v = min(d[i][j]/2, r[i][j]);
            if(v>1) ans += v-1;
            v = min(d[i][j], l[i][j]/2);
            if(v>1) ans += v-1;
            v = min(d[i][j]/2, l[i][j]);
            if(v>1) ans += v-1;
        }
    }
    return ans;
}

int main(){
    int tc; scanf("%d",&tc);
    for(int tt=1;tt<=tc;++tt){
        scanf("%d%d",&n,&m);
        for(int i=1;i<=n;++i)
            for(int j=1;j<=m;++j)
                scanf("%d",&a[i][j]);
        int ans = solve();
        printf("Case #%d: %d\n",tt,ans);
    }
}
```

### C. Rabbit House

R x C 모양의 각 그리드에 박스들이 쌓여 있다. 이웃한 위치에 대해 박스 개수의 차이가 최대 1이 되도록 하려고한다. 추가로 필요한 박스의 최소 개수를 구하는 문제다.

모든 그리드를 순서대로 돌면서 이웃과 비교해서 박스 높이를 최저로 맞춰준다. 한 번 돌 때마다 O(R+C)개의 그리드는 조건을 만족하게 된다. 따라서 이를 O(RC)번 수행하면 모든 그리드가 조건을 만족하게 된다.

**반복문 범위를 잘못 정해줘서 한 번 틀렸다.**

다른 풀이도 봤다. 가장 높이 쌓여있는 그리드는 더 쌓을 필요가 없기 때문에 다익스트라로 풀 수 있다. 높이가 확정되지 않은 위치를 max heap에 넣고 순서대로 방문하면서 이웃들의 높이를 적어도 -1 만큼 높아지게 맞춰주면 된다.

```cpp
#include<bits/stdc++.h>
using namespace std;
#define size(v) ((int)v.size())
#define all(v) (v).begin(),(v).end()
using lint = long long;
using fint = long double;
const lint INF = 1e9 + 9;int r, c, g[300][300];

lint solve(){
    lint ret = 0;
    while(true){
        for(int i=0;i<r;++i){
            for(int j=0;j<c;++j){
                if(i>0 && g[i][j] < g[i-1][j]-1)
                    ret += g[i-1][j]-1 - g[i][j], g[i][j] = g[i-1][j] - 1;
                if(j>0 && g[i][j] < g[i][j-1]-1)
                    ret += g[i][j-1]-1 - g[i][j], g[i][j] = g[i][j-1] - 1;
                if(i<r-1 && g[i][j] < g[i+1][j]-1)
                    ret += g[i+1][j]-1 - g[i][j], g[i][j] = g[i+1][j] - 1;
                if(j<c-1 && g[i][j] < g[i][j+1]-1)
                    ret += g[i][j+1]-1 - g[i][j], g[i][j] = g[i][j+1] - 1;
            }
        }
        bool chk = true;
        for(int i=0;i<r;++i)
            for(int j=0;j<c;++j){
                if(i<r-1 && abs(g[i][j]-g[i+1][j])>1)
                    chk = false;
                if(i>0 && abs(g[i][j]-g[i-1][j])>1)
                    chk = false;
                if(j>0 && abs(g[i][j]-g[i][j-1])>1)
                    chk = false;
                if(j<c-1 && abs(g[i][j]-g[i][j+1])>1)
                    chk = false;
            }
        if(chk) break;
    }
    return ret;
}

int main(){
    int tc; scanf("%d",&tc);
    for(int tt=1;tt<=tc;++tt){
        scanf("%d%d",&r,&c);
        for(int i=0;i<r;++i)
            for(int j=0;j<c;++j)
                scanf("%d",&g[i][j]);
        lint ans = solve();
        printf("Case #%d: %lld\n",tt,ans);
    }
}
```

### D. Checksum

N x N 크기의 0과 1로 이뤄진 행렬 A가 있는데, 몇 개의 원소가 -1로 대체되어 버렸다. 원래 행렬에서 각 행의 원소를 모두 XOR한 값과 각 열의 원소를 XOR한 값을 알고 있다. 따라서 몇 개의 원소를 복원하면 남은 원소들을 유추할 수 있기 때문에 행렬 A를 다시 구할 수 있다. A[i][j]를 복원하기 위해서는 B[i][j]의 비용이 들 때, 행렬 A를 복원하는데 드는 최소 비용을 구하는 문제다.

대회 중에는 DP, Greedy, Flow로 접근해봤으니 풀지 못했다(아는 거 다 시도했다 ㅋㅋ). **이전에 비슷한 문제를 풀어봤지만 대회 중에 풀지 못했다.**

이 문제는 놀랍게도 MST로 해결하는 문제였다. 맞은 사람들의 코드를 봐도 이해할 수가 없어 어떤 코드포스 블로그의 풀이를 참고했다.

첫 번째 관찰은 대체되지 않은 원소를 비용이 0인 복원해야할 원소로 보는 것이다. 그러면 간단하게 모든 숫자를 최소 비용으로 복원해야하는 문제로 환원된다.

두 번째 관찰은 N x N 행렬에서 정확히 (N-1)^2개의 원소만 복원하면 된다는 것이다.

- (N-1)^2개보다 적게 복원하는 경우, 최소 2N개의 원소가 비어있게 된다. 반면 XOR한 값으로 최대 2N-1개의 원소만 복원할 수 있다.

- (N-1)^2개보다 많이 복원하는 경우, 최소 하나의 행 또는 열이 모두 복원된다. XOR한 값을 알고 있기 때문에 모두 복원할 필요가 없다.

이제 (N-1)^2개의 복원할 원소를 고르는 것 대신 2N-1개의 원소를 제외해보자. 제외할 2N-1개의 원소의 비용이 최대가 되면 전체 비용은 최소가 되기 때문이다.

아이디어는 N개의 행과 N개의 열을 노드로 보고 각 원소를 속한 행과 열을 연결하는 간선으로 생각하는 것이다. 그러면 총 2N개의 노드가 생기고 우리는 그 중 비용이 최대가 되는 2N-1개의 간선을 고르면 된다.

MST로 이 문제를 풀 수 있음을 보장하기 위해 사이클이 허용되는지 확인해야 한다. 행과 열 사이에는 간선이 없으므로 사이클은 반드시 $r_0\leftrightarrow c_0\leftrightarrow r_1\leftrightarrow c_1\cdots\leftrightarrow r_0$꼴이다. 이러한 사이클이 있다면 최소 두 개의 원소가 제외된 행 또는 열이 있게 된다. 이는 각 원소를 유추할 수 없기 때문에 모순이 된다.

따라서 2N개의 노드에서 2N-1개의 간선을 사이클 없이 골라야하는 문제가 됐고 이를 MST 알고리즘으로 해결하면 O(N^2logN)에 해결할 수 있다.

```cpp
#include<bits/stdc++.h>
using namespace std;
#define size(v) (int)v.size()
#define all(v) (v).begin(),(v).end()
using lint = long long;
using fint = long double;
const lint INF = 1e9 + 9;

int n;
int a[500][500], b[500][500];
int r[500], c[500];

int p[1000];
void init(int n){
    iota(p, p+n, 0);
}
int find(int x){
    return x==p[x] ? x : p[x] = find(p[x]);
}
bool uni(int x,int y){
    if((x=find(x))^(y=find(y)))
        return p[x] = y, true;
    return false;
}

int solve(){
    priority_queue<tuple<int,int,int>> pq;
    for(int i=0;i<n;++i)
        for(int j=0;j<n;++j)
            pq.emplace(b[i][j], i, n+j);

    int ans = 0;
    init(n*2);
    while(!pq.empty()){
        auto [c, x, y] = pq.top(); pq.pop();
           if(!uni(x,y)) ans += c;    
    }
    return ans;
}

int main(){
    int tc; scanf("%d",&tc);
    for(int tt=1;tt<=tc;++tt){
        scanf("%d",&n);
        for(int i=0;i<n;++i)
            for(int j=0;j<n;++j)
                scanf("%d",&a[i][j]);
        for(int i=0;i<n;++i)
            for(int j=0;j<n;++j)
                scanf("%d",&b[i][j]);
        for(int i=0;i<n;++i)
            scanf("%d",&r[i]);
        for(int i=0;i<n;++i)
            scanf("%d",&c[i]);
        int ans = solve();
        printf("Case #%d: %d\n",tt,ans);
    }
}
```

### References

---

[My Editorial for Google Kick Start 2021 Round A - Codeforces](https://codeforces.com/blog/entry/88850)
