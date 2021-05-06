---
layout: post
title: "Codeforces Global Round 14 개인 풀이"
description: "대회 참가 후기 및 개인 풀이"
tags: [editorial]
---

### A. Phoenix and Gold

서로 다른 원소를 가지는 길이 n의 수열과 음이 아닌 정수 x가 주어진다. 이 수열의 어떤 prefix-sum도 정확히 x가 되지 않도록 수열을 재배열하는 문제다.

prefix-sum 배열을 구해보고 정확히 x인 곳이 있다면 그 위치 원소와 그 다음 원소를 swap해줬다. 각 원소는 서로 다르기 때문에 swap하면 해당 prefix-sum만 바뀌게 된다. 수열의 전체 합이 x인 경우는 답이 존재하지 않는다.

```cpp
#include<bits/stdc++.h>
using namespace std;
#define size(v) (int)v.size()
#define all(v) (v).begin(),(v).end()
using lint = long long;
using fint = long double;
const int INF = 1e9 + 9;

int n, x;
int w[100];

int p[100];

bool solve(){
    p[0] = w[0];
    for(int i=1;i<n;++i)
        p[i] = p[i-1] + w[i];
    if(p[n-1] == x) return false;
    for(int i=0;i<n-1;++i)
        if(p[i] == x) swap(w[i],w[i+1]);
    return true;
}

int main(){
    int tc; scanf("%d",&tc);
    while(tc--){
        scanf("%d%d",&n,&x);
        for(int i=0;i<n;++i)
            scanf("%d",w+i);
        if(!solve()) puts("NO");
        else{
            puts("YES");
            for(int i=0;i<n;++i)
                printf("%d ",w[i]); puts("");
        }
    }
}
```

### B. Phoenix and Puzzle

n개의 직각 이등변 삼각형으로 정사각형을 만들 수 있는지 구하는 문제다.

다음과 같이 2개 또는 4개의 직각 이등변 삼각형으로 정사각형을 만들면, n/2개 또는 n/4개의 정사각형이 만들어진다. 이렇게 만든 정사각형의 개수가 제곱 수라면, 하나의 큰 정사각형으로 만들 수 있다. 다른 방법은 존재하지 않는다. 직각 이등변 삼각형의 긴 변이 짧은 변의 $\sqrt{2}$배로 무리수이기 때문에 짧은 변끼리 변을 이루거나 긴 변끼리 변을 이뤄야하기 때문이다.

n/2 또는 n/4가 제곱수인지 O(sqrt(n))에 확인하면 된다. 나는 가능한 모든 n을 전처리했다.

```cpp
#include<bits/stdc++.h>
using namespace std;
#define size(v) (int)v.size()
#define all(v) (v).begin(),(v).end()
using lint = long long;
using fint = long double;
const int INF = 1e9 + 9;

int n;
set<int> ans;

void init(){
    for(int i=1;i*i*2<INF;++i){
        ans.emplace(i*i*2);
        ans.emplace(i*i*4);
    }
}

bool solve(){
    return ans.find(n) != ans.end();
}

int main(){
    init();

    int tc; scanf("%d",&tc);
    while(tc--){
        scanf("%d",&n);
        puts(solve() ? "YES" : "NO");
    }
}
```

### C. Phoenix and Towers

높이가 x를 넘지 않는 n개의 기둥이 있다. 이 기둥을 쌓아올려 m개의 탑으로 만드려고 한다. 이 때, 어떤 두탑도 높이 차이가 x보다 크지 않도록 만드는 문제다.

높이가 낮은 기둥부터 m개의 각 탑에 하나식 쌓아주면 된다. 모든 기둥이 x보다 낮기 때문에 각 탑에 기둥이 하나식 쌓일 때마다 누적되는 높이 차이를 모두 합쳐도 x를 넘지 않는다.

```cpp
#include<bits/stdc++.h>
using namespace std;
#define size(v) (int)v.size()
#define all(v) (v).begin(),(v).end()
using lint = long long;
using fint = long double;
const int INF = 1e9 + 9;

int n, m, x;
int h[100000];

int t[100000];
int y[100000];

bool solve(){
    vector<pair<int,int>> hi;
    for(int i=0;i<n;++i)
        hi.emplace_back(h[i],i);
    sort(all(hi));

    for(int i=0;i<m;++i)
        t[i] = 0;
    for(int i=0;i<n;++i)
        t[i%m] += hi[i].first, y[hi[i].second] = i%m + 1;

    for(int i=1;i<m;++i)
        if(abs(h[i-1]-h[i])>x)
           return false;
    return true;    
}

int main(){
    int tc; scanf("%d",&tc);
    while(tc--){
        scanf("%d%d%d",&n,&m,&x);
        for(int i=0;i<n;++i)
            scanf("%d",h+i);
        if(!solve()) puts("NO");
        else{
            puts("YES");
            for(int i=0;i<n;++i)
                printf("%d ",y[i]); puts("");
        }
    }
}
```

### D. Phoenix and Socks

n개의 양말이 있다. 각 양말에 대해 색상과 왼쪽 양말인지 오른쪽 양말인지 주어진다. 1달러를 주고 어떤 양말의 색상을 바꾸거나, 오른쪽 양말을 왼쪽 양말로, 왼쪽 양말을 오른쪽 양말로 바꿀 수 있다. 모든 양말을 짝지을 수 있도록 하는 최소 달러를 출력하는 문제다.

먼저, 짝이 없는 양말에 대해 색이 같은 양말이 있으면 1달러를 주고 반대쪽 양말로 바꿔준다. 남은 양말들은 오른쪽, 왼쪽 개수를 맞춰주고 색상만 맞춰준다.

```cpp
#include<bits/stdc++.h>
using namespace std;
#define size(v) (int)v.size()
#define all(v) (v).begin(),(v).end()
using lint = long long;
using fint = long double;
const int INF = 1e9 + 9;

int n, l, r;
int a[200001], b[200001];

int cnt[200001];

int solve(){
    int ret = 0;
    for(int i=1;i<=n;++i) cnt[i] = 0;
    for(int i=0;i<l;++i) cnt[a[i]]++;
    for(int i=0;i<r;++i) cnt[b[i]]--;

    int ll = 0, rr = 0;
    for(int i=1;i<=n;++i){
        if(cnt[i]>0) ll += abs(cnt[i]);
        if(cnt[i]<0) rr += abs(cnt[i]);
    }
    for(int i=1;i<=n;++i){
        while(ll-rr>=2 && cnt[i]>= 2) ll -= 2, cnt[i] -= 2, ret++;
        while(rr-ll>=2 && cnt[i]<=-2) rr -= 2, cnt[i] += 2, ret++;
    }
    ret += max(ll, rr) - (ll+rr)/2;
    ret += (ll+rr)/2;
    return ret;
}

int main(){
    int tc; scanf("%d",&tc);
    while(tc--){
        scanf("%d%d%d",&n,&l,&r);
        for(int i=0;i<l;++i)
            scanf("%d",a+i);
        for(int i=0;i<r;++i)
            scanf("%d",b+i);
        printf("%d\n",solve());
    }
}
```

### E. Phoenix and Computers

n개의 컴퓨터가 일렬로 설치되어 있고, 한 번에 한 컴퓨터를 켤 수 있다. i-1번째 컴퓨터와 i+1번째 컴퓨터가 켜지면 i번째 컴퓨터는 자동으로 켜지게 된다. 이 때, 모든 컴퓨터를 켜는 방법의 수를 구하는 문제다.

Dynamic Programming으로 해결할 수 있다. 양 끝 컴퓨터는 반드시 직접 켜질 수 없고, 연속한 컴퓨터는 자동으로 켜질 수 없다. 직접 켤 컴퓨터는 `o` 자동으로 켜질 컴퓨터는 `x`라고 하면, `oxooxo...xoxo`와 같은 문자열로 나타낼 수 있다. 이제 다음과 같이 정의하자

    dp[i][j] = (i개의 컴퓨터를 켜는데 j개가 자동으로 켜지는 방법의 수)

`x`를 기준으로 연속한 `o`를 분리하여 생각해보자. 각 `o...o`를 독립적으로 켜는 순서를 고정하면, 매 번 어떤 `o...o`를 고르는가에 따라 순서가 정해진다. 따라서 다음과 같이 `o...o`들을 켜는 방법을 전처리해둔다. 이는 위의 정의에 의해 dp[i][0]의 값과 같다.

    cnt[i] = (i개의 연속한 컴퓨터를 직접 켜는 방법의 수)

그러면 다음과 같은 점화식을 얻을 수 있다.

$$
dp[i][k] = \sum_{j=1}^{i-2} dp[j][k-1] \cdot cnt[i-j-1] \cdot {}_{j-(k-1)}\rm{H}_{i-j-1}
$$

맨 뒤에 i-j-1개의 `o`를 켜는 순서 사이에 dp[j][k-1]을 끼워넣는 방법의 수를 생각하면 쉽게 유도할 수 있다. combination table과 cnt[i]를 O(N^2)에 전처리하면 총 O(N^3)에 dp 테이블을 채울 수 있다.

```cpp
#include<bits/stdc++.h>
using namespace std;
#define size(v) (int)v.size()
#define all(v) (v).begin(),(v).end()
using lint = long long;
using fint = long double;
const int INF = 1e9 + 9;

int n, m;

lint c[1000][1000];
lint cnt[401];
lint dp[401][401];

lint solve(){
    for(int i=0;i<1000;++i){
        c[i][0] = 1;
        for(int j=1;j<1000;++j)
            c[i][j] = (c[i-1][j] + c[i-1][j-1]) % m;
    }
    for(int i=1;i<=n;++i)
        for(int j=1;j<=i;++j){
            int x = j-1, y = i-j;
            cnt[i] = (cnt[i] + c[x+y][y]) % m;
        }
    for(int i=1;i<=n;++i){
        dp[i][0] = cnt[i];
        for(int j=1;j<=i-2;++j)
            for(int k=1;k<=i/2;++k)
                dp[i][k] = (dp[i][k] + dp[j][k-1] * c[j-k + i-j][i-j-1] % m * cnt[i-j-1]) % m;
    }

    lint ret = 0;
    for(int i=0;i<=n/2;++i)
        ret = (ret + dp[n][i]) % m;
    return ret;
}

int main(){
    scanf("%d%d",&n,&m);
    printf("%lld",solve());
}
```

### F. Phoenix and Earthquake

n개의 도시와 m개의 부서진 도로가 주어진다. i번째 도시는 a[i]톤의 아스팔트를 가지고 있다. 두 도시 사이의 부서진 도로를 복구하는데 x톤의 아스팔트가 쓰인다. 따라서 두 도시의 아스팔트 합이 x이상일 때만 복구 가능하며, 복구된 도로로 연결된 도시끼리는 아스팔트를 옮길 수 있다. 이 때 n-1개의 도로를 복구하여 모든 도시를 연결할 수 있는지, 있다면 어떤 순서로 연결해야하는지 구하는 문제다.

전체 도시의 아스팔트 합이 (n-1) \* x 이상이라면 항상 답이 존재한다. 이를 수학적 귀납법으로 증명해보자. n=1일 때는 자명하다. n이 2이상일 때, 항상 복구할 수 있는 도로가 있음을 보이기만 하면 된다. 그러한 도로를 복구하면 연결해야할 도로는 n-1개로 하나 줄고, (n-2) \* x 이상의 아스팔트가 남기 때문에 귀납적으로 증명하기에 충분하다.

x 이상의 아스팔트를 가진 도시가 있는 경우, 아무 인접한 도시를 골라 도로를 복구할 수 있다.

x 이상의 아스팔트를 가진 도시가 없는 경우, 두 도시의 아스팔트의 합이 x이상인 도시 i, j가 반드시 존재하기 때문에 해당 도로를 복구할 수 있다(그러한 두 도시가 없다고 가정하면, 모든 i, j에 대해 a[i]+a[j] < x가 성립해야 하는데 이러면 전체 도시의 아스팔트 합이 (n-1) \* x보다 작아 모순이 된다).

따라서 매번 복구 가능한 도로를 찾아서 복구하면 된다. 복구 가능한 도로를 찾는 것도 간단한데, 아스팔트가 가장 많은 도시를 찾아서 아무 인접한 도시와 이어주면 된다. 아스팔트가 가장 많은 도시는 인접한 도시와 아스팔트를 합치면 항상 x이상이 된다(귀류법으로 증명할 수 있다).

나는 아스팔트를 가장 많이 얻을 수 있는 간선부터 greedy하게 복구하려고 했으나, 간선이 복구될 때마다 다른 많은 간선들을 업데이트 해줘야 해서 결국 **구현에 실패했다**. 실제로 이렇게 푼 사람도 있어서 틀린 접근은 아니었다. 하지만 몇 가지 증명을 하면 위와 같이 훨씬 쉬운 방법으로 풀린다. 이 문제까지 풀면 레이팅 2400이상의 퍼포먼스가 나온다. 증명에 대한 접근법과 구현 능력 모두 길러야 겠다.

```cpp
#include<bits/stdc++.h>
using namespace std;
#define all(v) (v).begin(),(v).end()
using pii = pair<int,int>;
using lint = long long;
const int INF = 1e9 + 9;

int n, m;
lint x, a[300001];
list<pii> adj[300001];

vector<int> ans;

int p[300001];
void init(int n){
    for(int i=1;i<=n;++i) p[i] = i;
}
int find(int x){
    return p[x]==x ? x : p[x] = find(p[x]);
}

bool solve(){
    if(accumulate(a+1,a+n+1,0ll) < x*(n-1))
        return false;

    init(n);

    priority_queue<pair<lint,int>> pq;
    for(int i=1;i<=n;++i)
        pq.emplace(a[i],i);
    while(!pq.empty()){
        auto [aa, x] = pq.top(); pq.pop();
        if(x != find(x) || aa != a[x]) continue;

        while(!adj[x].empty() && x == find(adj[x].back().first))
            adj[x].pop_back();
        if(adj[x].empty()) continue;

        auto [y, idx] = adj[x].back(); adj[x].pop_back();
        y = find(y);
        if(adj[x].size() < adj[y].size()) swap(x,y);
        for(auto it : adj[y]) adj[x].push_back(it);
        p[y] = x;
        a[x] += a[y] - ::x;

        pq.emplace(a[x],x);
        ans.emplace_back(idx);
    }
    return true;
}

int main(){
    scanf("%d%d%lld",&n,&m,&x);
    for(int i=1;i<=n;++i)
        scanf("%lld",a+i);
    for(int i=1;i<=m;++i){
        int u, v; scanf("%d%d",&u,&v);
        adj[u].emplace_back(v,i);
        adj[v].emplace_back(u,i);
    }
    if(!solve()) puts("NO");
    else{
        puts("YES");
        for(auto it : ans)
            printf("%d\n",it);
    }
}
```

다른 해결 방법도 있다. 모든 도시가 연결되어야 하므로 스패닝 트리를 생각할 수 있다. 임의의 스패닝 트리를 정해서 여기에 속한 간선만을 고려하자. 어떤 리프 노드 i에 대해 부모 p가 a[p]+a[i] >= x를 만족하면 연결하면 된다. 그렇지 않다면, a[i] < x이므로 이 리프 노드를 제외한 트리는 최소 (n-2) \* x 이상의 아스팔트를 가진다. 따라서 이 리프를 제외하고 스패닝 트리를 다 만든 뒤, 마지막에 합칠 수 있다. 이를 DFS  한 번으로 구현하면 O(m+n)에 해결할 수 있다.
