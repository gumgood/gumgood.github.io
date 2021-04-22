---
layout: post
title: "Codeforces Round 716 (Div.2)"
description: "A~D번까지 업솔빙"
tags: [editorial]
---

### A. Perfectly Imperfect Array

길이 n의 수열 a가 주어진다. 어떤 a의 부분수열에 대해 수열의 곱이 perfect square가 아닌 경우가 있는지 출력하는 문제다.

모든 수가 perfect square가 아닌 수가 하나라도 있으면 길이 1의부분수열로 보면 된다.

```cpp
#include<bits/stdc++.h>
using namespace std;
#define size(v) (int)v.size()
#define all(v) (v).begin(),(v).end()
using lint = long long;
using fint = long double;
const int INF = 1e9 + 9;

bool chk[10001];

int n, a[100];

bool solve(){
    for(int i=0;i<n;++i)
        if(!chk[a[i]]) return true;
    return false;
}

int main(){
    for(int i=1;i*i<=10000;++i)
        chk[i*i] = true;

    int tc; scanf("%d",&tc);
    while(tc--){
        scanf("%d",&n);
        for(int i=0;i<n;++i)
            scanf("%d",a+i);
        puts(solve() ? "YES" : "NO");
    }
}
```

### B. AND 0, Sum Big

길이가 n인 수열이 있다. 각 원소의 크기는 0이상 2^k-1이고 모든 원소의 bitwise AND값이 0이다. 이때 수열의 합이 가장 큰 경우는 몇 가지 인지 출력하는 문제다.

bit관점에서 보면 간단하다. n개의 2^k-1을 나열해놓고 각 bit 자리수마다 0을 하나식만 두면된다. k개의 각 자리수에는 n개의 수가 있고 그 중 하나를 골라야 하므로 n^k를 출력하면 된다.

```cpp
#include<bits/stdc++.h>
using namespace std;
#define size(v) (int)v.size()
#define all(v) (v).begin(),(v).end()
using lint = long long;
using fint = long double;
const int INF = 1e9 + 9;
const lint mod = 1e9 + 7;

lint mypow(lint a,lint p){
    lint ret = 1;
    for(;p;p>>=1, a = a*a%mod)
        if(p&1) ret = ret*a%mod;
    return ret;
}

int n, k;

int main(){
    int tc; scanf("%d",&tc);
    while(tc--){
        scanf("%d%d",&n,&k);
        printf("%lld\n",mypow(n,k));
    }
}
```

### C. Product 1 Modulo N

[1, 2, ..., n-1]의 부분수열에 대해 수열의 곱이 1 (mod n)이 되는 가장 긴 부분수열을 출력하는 문제다.

n과 서로소가 아닌 수를 곱하면 수열의 곱도 n과 서로소가 아니게 된다. n과 서로소가 아닌 수는 1 (mod n)이 될 수 없으므로 n과 서로소가 아닌 수는 곱할 수 없다. 이제 n과 서로소인 수를 모두 곱한 값을 p라고 하자. p가 1이면 그대로 출력하고, 1이 아니면 p를 제외하고 출력하면 된다.

```cpp
#include<bits/stdc++.h>
using namespace std;
#define size(v) (int)v.size()
#define all(v) (v).begin(),(v).end()
using lint = long long;
using fint = long double;
const int INF = 1e9 + 9;

int n;

void solve(){
    set<int> ans;
    lint mul = 1;
    for(int i=1;i<n;++i)
        if(gcd(i,n)==1){
            ans.emplace(i);
            mul = mul * i % n;
        }
    if(mul!=1) ans.erase(mul);

    printf("%d",size(ans));
    for(auto it : ans) printf("%d ",it);
}

int main(){
    scanf("%d",&n);
    solve();
}
```

### D. Cut and Stick

길이 n의 수열 a가 주어진다. 각 쿼리마다 l, r이 주어지면 [l,r]구간의 원소들을 몇 개의 subsequence로 분할할 수 있다. 단, 모든 subsequece에 대해 길이가 x라면, ceil(x/2)보다 많이 등장하는 원소가 없도록 분할한다. 이때 분할해야하는 subsequence의 최소 개수를 출력하는 문제다.

[l,r] 구간의 최빈값이 등장한 회수를 mx라 하자. mx<=ceil((r-l)/2)이면 분할할 필요가 없고, mx>ceil((r-l)/2)인 경우를 생각해보자. 최빈값이 아닌 수가 등장한 회수 res는 r-l+1-mx이다. 하나의 subsequence에 최빈값이 아닌 수가 res개 있으면 최빈값은 res+1개까지 있을 수 있다. 남은 mx-(res+1)개의 최빈값은 개별적인 길이 1인 subsequence가 되어야 한다. 따라서 최소 1+mx-(res+1) = mx-res개의 subsequence로 분할할 수 있다.

각 쿼리마다 [l,r]의 최빈값이 등장한 회수는 다양한 방법(Randomized, Mo's, MergeSort tree, Segment tree)로 해결가능하다.

```cpp
#include<bits/stdc++.h>
using namespace std;
#define size(v) (int)v.size()
#define all(v) (v).begin(),(v).end()
using lint = long long;
using fint = long double;
const int INF = 1e9 + 9;

struct segtree{
    int n;
    vector<int> t;
    vector<vector<int>> b;
    segtree(int n,int a[]) : n(n), t(n<<2, 0), b(n+1) {
        for(int i=0;i<n;++i) b[a[i]].push_back(i);
        init(1,0,n-1,a);
    }

    int cnt(int l,int r,int v){
        return upper_bound(all(b[v]),r) - lower_bound(all(b[v]),l);
    }

    int init(int n,int s,int e,int a[]){
        if(s==e) return t[n] = a[s];
        int m = (s+e)>>1;
        int lv = init(n<<1,s,m,a);
        int rv = init(n<<1|1,m+1,e,a);
        return t[n] = (cnt(s,e,lv) >= cnt(s,e,rv) ? lv : rv);
    }

    int qry(int l,int r){ return cnt(l,r,qry(1,0,n-1,l,r)); }
    int qry(int n,int s,int e,int l,int r){
        if(r<s || e<l) return 0;
        if(l<=s&&e<=r) return t[n];
        int m = (s+e)>>1;
        int lv = qry(n<<1,s,m,l,r);
        int rv = qry(n<<1|1,m+1,e,l,r);
        return cnt(max(l,s),min(r,e),lv) >= cnt(max(l,s),min(r,e),rv) ? lv : rv;
    }
};

int n, q, l, r;
int a[300000];

int main(){
    scanf("%d%d",&n,&q);
    for(int i=0;i<n;++i)
        scanf("%d",a+i);

    segtree st(n, a);
    for(int i=0;i<q;++i){
        scanf("%d%d",&l,&r);
        int mx = st.qry(l-1,r-1);
        int res = r-l+1 - mx;
        if(mx <= (r-l+2)/2)
            printf("1\n");
        else
            printf("%d\n", mx - res);
    }
}
```

### E. Baby Ehab's Hyper Apartment

다음에 풀어보도록 하자.
