---
layout: post
title: "Codeforces Round 709 (Div. 2)"
description: "A~E번까지 업솔빙"
tags: [editorial]
---

### A. Prison Break

a x b 격자 형태의 감옥이 있다. 각 방에서 상하좌우 인접한 방 사이에 벽이 없으면 이동할 수 있다. 모든 방에서 외부로 갈 수 있게 하기 위해서 최소 몇 개의 벽을 없애야 하는지 구하는 문제다.

ab+1개의 정점(ab개의 방과 1개의 외부 공간)을 모두 연결시키는데 필요한 간선의 개수를 구하는 것과 같다. 트리의 구조를 생각해보면 ab개의 간선이 필요하다는 것을 알 수 있다.

```cpp
#include<bits/stdc++.h>
using namespace std;
#define size(v) ((int)v.size())
#define all(v) (v).begin(),(v).end()
using lint = long long;
using fint = long double;
const lint INF = 1e9 + 9;

int main(){
    int tc; scanf("%d",&tc);
    while(tc--){
        int a, b;
        scanf("%d%d",&a,&b);
        printf("%d\n",a*b);
    }
}
```

### B. Restore Modulo

어떤 $s$, $m$, $c$에 대해 다음과 같이 수열 $a$가 정의된다.

$$
\begin{aligned}
a_1 &= s \bmod m \\
a_i &= (a_{i-1} + c) \bmod m
\end{aligned}
$$

수열 $a$가 주어지면 가능한 $m$ 중 가장 큰 값과 그 때의 $c$를 출력하는 문제다.

핵심은 $0 \le c \lt m$이다. 이 범위로부터

- $a_i - a_{i-1} \ge 0$이면 $c = a_i - a_{i-1}$이고

- $a_i - a_{i-1} \lt 0$이면 $c = a_i - a_{i-1} + m$임을 알 수 있다.

모든 $i$에 대해 $c$와 $m$이 모두 같다면 이 값이 문제의 정답이 된다. 이 때 $a_i$가 정렬되어 있는 경우 $m$을 특정할 수 없어 무한대로 커질 수 있다.

구현하면서 계속 생각한 풀이가 바뀌어서 너무 오래 걸렸다. **정수론에 많이 약한 것 같다**.

```cpp
#include<bits/stdc++.h>
using namespace std;
#define size(v) ((int)v.size())
#define all(v) (v).begin(),(v).end()
using lint = long long;
using fint = long double;
const lint INF = 1e9 + 9;

int n, a[100000];

int solve(){
    vector<int> x(a,a+n), y(a,a+n);
    bool srt = false;
    sort(all(y));
    if(x==y) srt = true;
    sort(rall(y));
    if(x==y) srt = true;
    if(srt){
        bool chk = true;
        for(int i=2;i<n;++i)
            if(a[i-2]-a[i-1]!=a[i-1]-a[i])
                chk = false;
        if(chk) return 0;
    }

    int d = 1;
    for(int i=1;i<n;++i)
        if(a[i-1] <= a[i])
            d = a[i] - a[i-1];

    int m = 1;
    for(int i=1;i<n;++i)
        if(a[i-1] > a[i])
            m = a[i-1] + d - a[i];

    for(int i=1;i<n;++i)
        if((a[i-1]+d)%m != a[i])
            return -1;
    for(int i=0;i<n;++i)
        if(a[i] >= m)
            return -1;

    printf("%d %d\n",m,d);
    return 1;
}

int main(){
    int tc; scanf("%d",&tc);
    while(tc--){
        scanf("%d",&n);
        for(int i=0;i<n;++i)
            scanf("%d",a+i);

        int ans = solve();
        if(ans <= 0)
            printf("%d\n",ans);
    }
}
```

### C. Basic Diplomacy

n명의 친구가 있는데, m일간 매일 친구 중 한 명을 부른다. 각 날마다 부를 수 있는 친구의 목록이 주어진다. 각 친구가 $\left\lceil\dfrac{m}{2}\right\rceil$보다 많이 초대되지 않도록 적절히 친구를 부르는 문제다.

$\left\lceil\dfrac{m}{2}\right\rceil$보다 많이 초대될 수 있는 친구가 없다면 아무나 부르면 된다. 그러한 친구가 있다면 먼저 $\left\lceil\dfrac{m}{2}\right\rceil$번 부르고 남은 날들은 다른 친구를 부르면 된다. 다른 친구들을 부를 수 없으면 답은 존재하지 않는다.

풀이는 쉽게 떠올렸으나 구현이 너무 오래 걸렸다. 코드를 몇 번이나 다시 짰고 그 과정에서 한 번 틀리기도 했다. **구현력이 부족하다**.

```cpp
#include<bits/stdc++.h>
using namespace std;
#define size(v) ((int)v.size())
#define all(v) (v).begin(),(v).end()
using lint = long long;
using fint = long double;
const lint INF = 1e9 + 9;

int n, m;
vector<vector<int>> a;

bool v[100001];
int cnt[100001];

void solve(){
    for(int i=0;i<m;++i) v[i] = false;

    for(int i=0;i<=n;++i) cnt[i] = 0;
    for(auto &v : a) for(auto it : v) cnt[it]++;

    int mx = 0;
    for(int i=1;i<=n;++i)
        if(cnt[i] > cnt[mx])
            mx = i;
    for(int i=0;i<m;++i)
        for(auto it : a[i])
            if(it == mx)
                v[i] = true, a[i].erase(find(all(a[i]),mx));

    if(cnt[mx] <= (m+1)/2){
        puts("YES");
        for(int i=0;i<m;++i)
            printf("%d ",a[i][0]);
        puts("");
        return;
    }

    int chk = 0;
    for(int i=0;i<m;++i)
        if(a[i].empty()) chk++;
    if(chk > (m+1)/2){
        puts("NO");
        return;
    }

    int res = (m+1)/2 - chk;
    puts("YES");
    for(int i=0;i<m;++i){
        if(a[i].empty())
            printf("%d ",mx);
        else if(res && v[i])
            printf("%d ",mx), res--;
        else
            printf("%d ",a[i][0]);
    }
    puts("");
}

int main(){
    int tc; scanf("%d",&tc);
    while(tc--){
        scanf("%d%d",&n,&m);
        a.clear();
        for(int i=0;i<m;++i){
            a.eb();
            int sz, x;
            scanf("%d",&sz);
            for(int j=0;j<sz;++j)
                scanf("%d",&x), a[i].eb(x);
        }
        solve();
    }
}
```

### D. Playlist

원수열이 주어지면 앞에서부터 보면서 이웃한 원소의 GCD가 1이면 뒤에 있는 원소를 제거한다. 원소를 제거한 경우 그 다음 원소부터 시작한다. 더 이상 제거할 원소가 없을 때까지 이를 반복했을 때, 제거된 원소들의 인덱스를 제거된 순서대로 출력하는 문제다.

원소의 제거는 최대 O(N)번 일어나기 때문에 다음 제거될 원소를 빠른 시간 안에 찾는다면 시뮬레이션으로 해결할 수 있다. GCD가 1인 이웃한 쌍들을 set으로 관리하고 현재 수열에 남아있는 수도 다른 set으로 관리해주면 된다. 포인트는 (a,b), (b,c)가 서로 이웃한데 b가 제거되는 경우 두 쌍을 모두 지우고 (a,c)를 삽입해주는 것이다.

대회 당시 E번이 더 많이 풀려 있었고, 또 정수론 문제구나 싶어서 넘겼다. 풀이를 보고 푸는데도 엄청 오래 걸렸다. 우선 **set의 method들을 아직 능숙하게 쓰지 못한다**. 특히 **코너 케이스 처리**가 너무 힘들었다. [x]인 경우, x 다음 또 x가 온다고 생각해서 gcd(x,x)를 확인해줘야 했다.

```cpp
#include<bits/stdc++.h>
using namespace std;
#define size(v) (int)v.size()
#define all(v) (v).begin(),(v).end()
using lint = long long;
using fint = long double;
const lint INF = 1e9 + 9;

int n, a[100000];

void solve(){
    vector<int> ans;
    set<int> res;
    set<pair<int,int>> s;
    for(int i=0;i<n;++i){
        if(__gcd(a[i],a[(i+1)%n])==1)
            s.emplace(i,(i+1)%n);
        res.emplace(i);
    }

    int cur = 0;
    while(!s.empty() && !res.empty()){
        auto it = s.lower_bound({cur,0});
        if(it==s.end()) it = s.begin();
        int del = it->second;
        cur = it->first;

        auto jt = s.lower_bound({del, 0});
        int nx = (jt!=s.end() && jt->first==del) ? jt->second : -1;

        res.erase(del);
        s.erase(it);

        if(~nx){
            s.erase({del,nx});
            if(__gcd(a[cur],a[nx])==1)
                s.emplace(cur,nx);
        }else{
            auto tt = res.lower_bound(del);
            if(tt==res.end()) tt = res.begin();
            if(__gcd(a[cur],a[*tt])==1)
                s.emplace(cur,*tt);
        }

        ans.emplace_back(del+1);
        cur = del;
    }
    printf("%d ",size(ans));
    for(auto it : ans) printf("%d ",it); puts("");
}

int main(){
    int t; scanf("%d",&t);
    while(t--){
        scanf("%d",&n);
        for(int i=0;i<n;++i)
            scanf("%d",a+i);
        solve();
    }
}
```

### E. Skyline Photo

높이 h가 서로 다른 N개의 건물이 일렬로 늘어서 있다. 각 건물은 아름다운 정도 b를 가진다. 연속된 건물을 한 장의 사진에 담을 수 있는데, 이때 사진의 아름다운 정도는 포함된 건물 중 가장 낮은 건물의 b와 같다. 사진이 겹치지 않게 N개의 건물을 모두 찍으려고 한다. 이 때 찍은 사진들의 아름다운 정도의 합을 최대로 하는 문제다.

dp[i] = (1에서 i번째 건물까지 사진 찍었을 때 최대값)으로 정의했다. j<i이고 h[j]<h[i]인 j번째 건물이 있다고 하자. 마지막 사진에 j번째 건물이 포함되는 경우, b[i] 더해지지 않기 때문에 dp[j]와 같은 값을 가진다. 마지막 사진에 j를 포함하지 않는 경우, i번째 건물이 가장 낮아 아름다움이 b[i]가 되기 때문에 min(dp[j ~ i-1]) + b[i]의 값을 가진다.

j가 여러 개면 그 중 가장 큰 값을 찾아야 한다(i는 j미만의 영향을 받지 않는다). 다시 말하면 수열 상에서 왼쪽 원소 중 자신보다 작으면서 가장 가까운 원소를 찾는 것과 같다. 이는 monotone queue로 쉽게 구할 수 있다. 마지막으로 min(dp[j ~ i-1])는 segment tree로 해결하면 된다.

거의 읽는 동시에 풀이가 나왔는데 **코너 케이스 처리**가 늦어 풀지 못했다. 대회 후반부로 갈 수록 집중력이 많이 떨어지는 것 같다. 생각이 꼬일 때는 formal하게 정리를 하고 코드를 짜는게 나을 것 같다.

```cpp
#include<bits/stdc++.h>
using namespace std;
#define size(v) (int)v.size()
#define all(v) (v).begin(),(v).end()
using lint = long long;
using fint = long double;
const lint INF = 1e18 + 18;

struct segtree{
    vector<lint> t; int n;
    segtree(int n) : n(n), t(n<<2, -INF) {}

    lint qry(int l,int r){ return qry(1,0,n-1,l,r); }
    lint qry(int n,int s,int e,int l,int r){
        if(r<s || e<l) return -INF;
        if(l<=s&&e<=r) return t[n];
        int m = (s+e)>>1;
        return max(qry(n<<1,s,m,l,r), qry(n<<1|1,m+1,e,l,r));
    }

    void upd(int i,lint v){ upd(1,0,n-1,i,v); }
    lint upd(int n,int s,int e,int i,lint v){
        if(i<s || e<i) return t[n];
        if(s==e) return t[n] = v;
        int m = (s+e)>>1;
        return t[n] = max(upd(n<<1,s,m,i,v), upd(n<<1|1,m+1,e,i,v));
    }
};

int n;
lint h[300001], b[300001];

lint solve(){
    deque<int> mq; mq.emplace_back(0);
    segtree dp(n+1); dp.upd(0, 0);
    for(int i=1;i<=n;++i){
        while(h[mq.back()] > h[i]) mq.pop_back();
        lint v = dp.qry(mq.back(), i) + b[i];
        if(mq.back()) v = max(v, dp.qry(mq.back(), mq.back()));
        dp.upd(i,v);
        mq.emplace_back(i);
    }
    return dp.qry(n,n);
}

int main(){
    scanf("%d",&n);
    for(int i=1;i<=n;++i)
        scanf("%lld",h+i);
    for(int i=1;i<=n;++i)
        scanf("%lld",b+i);
    printf("%lld",solve());
}
```

### F. Useful Edges

다음에 풀어보도록 하자.
