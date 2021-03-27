---
layout: post
title: "Atcoder Beginner Contest 196"
description: "A~E번까지 업솔빙"
tags: [editorial]
---

### A. Difference Max

정수 $a$, $b$, $c$, $d$에 대해 $a \le x \le b$와 $c \le y \le d$를 만족하는 $x$, $y$ 중 가장 큰 $x-y$값을 출력하는 문제다.

가장 큰 $x$에서 가장 작은 $y$를 빼면 되므로 $b-c$를 출력했다.

```cpp
#include<bits/stdc++.h>
using namespace std;
#define size(v) ((int)v.size())
#define all(v) (v).begin(),(v).end()
using lint = long long;
using fint = long double;
const lint INF = 1e9 + 9;

int main(){
    int a, b, c, d;
    scanf("%d%d%d%d",&a,&b,&c,&d);
    printf("%d", b - c);
}
```

### B. Round Down

소수점 아래 최대 100번 자리까지 수가 주어지면 이를 내림하여 출력한다.

문자열로 소수점 윗부분만 출력했다.

```cpp
#include<bits/stdc++.h>
using namespace std;
#define size(v) ((int)v.size())
#define all(v) (v).begin(),(v).end()
using lint = long long;
using fint = long double;
const lint INF = 1e9 + 9;

char a[101], b[101];

int main(){
    scanf("%[^.].%s", a, b);
    puts(a);
}
```

### C. Doubled

1~N사이에 자리수가 짝수이고 문자열로 봤을 때 앞뒤 절반이 서로 같은 수가 몇 개인지 출력하는 문제이다.

N=1e12까지이므로 i를 1e6까지 탐색하면서 ii꼴의 수가 1~N에 들어오는지 확인해서 셌다.

```cpp
#include<bits/stdc++.h>
using namespace std;
#define size(v) ((int)v.size())
#define all(v) (v).begin(),(v).end()
using lint = long long;
using fint = long double;
const lint INF = 1e9 + 9;

lint n;

int solve(){
    int ret = 0;
    lint p = 10;
    for(lint i=1;i<=1000000;++i){
        if(p <= i) p *= 10;
        if(i*p+i <= n) ret++;
    }
    return ret;
}

int main(){
    scanf("%lld",&n);

    int ans = solve();
    printf("%d",ans);
}
```

### D. Hanjo

H x W모양의 사각형 방에 2 x 1모양의 매트 A개와 1 x 1모양의 매트 B개를 까는 방법의 수를 출력하는 문제다. 2A + B = HW를 만족한다.

방의 크기 HW<=16으로 작기 때문에 완전 탐색으로 접근했다. 2 x 1모양의 매트만 모두 배치하면 나머지 공간은 1 x 1모양으로 알아서 채워지기 때문에 2 x 1모양만 고려해주면 된다. 각 위치에 대해 가로로 놓는 경우, 세로로 놓는 경우, 놓지 않는 경우가 있으므로 러프하게 3^16 = 4e7가지 경우가 나온다.

```cpp
#include<bits/stdc++.h>
using namespace std;
#define size(v) ((int)v.size())
#define all(v) (v).begin(),(v).end()
using lint = long long;
using fint = long double;
const lint INF = 1e9 + 9;

int h, w, a, b;

bool v[16][16];

int solve(int x,int y){
    if(a==0) return 1;    

    int nx = x, ny = y + 1;
    if(ny==w) nx = x+1, ny = 0;
    if(nx==h) return 0;

    int ret = solve(nx, ny);
    if(!v[x][y] && a){
        if(x+1<h && !v[x+1][y]){
            v[x][y] = v[x+1][y] = true, a--;
            ret += solve(nx, ny);
            v[x][y] = v[x+1][y] = false, a++;
        }
        if(y+1<w && !v[x][y+1]){
            v[x][y] = v[x][y+1] = true, a--;
            ret += solve(nx, ny);
            v[x][y] = v[x][y+1] = false, a++;
        }
    }
    return ret;
}

int main(){
    scanf("%d%d%d%d",&h,&w,&a,&b);

    int ans = solve(0,0);
    printf("%d",ans);
}
```

### E. **Filters**

정수로 이뤄진 수열 $A = (a_1, a_2, \dots, a_N)$, $T = (t_1, t_2, \dots, t_N)$, $X = (x_1, x_2, \dots, x_Q)$이 주어진다. 다음과 같이 $N$개의 함수 $f_1(x), f_2(x), \dots, f_N(x)$가 정의된다.

$$
f_i(x) = \begin{cases} x + a_i & (t_i = 1)\\ \max(x, a_i) & (t_i = 2)\\ \min(x, a_i) & (t_i = 3)\\ \end{cases}​
$$

이 때 $i = 1, 2, \dots, Q$에 대해 $f_N( \dots f_2(f_1(x_i)) \dots )$를 모두 구하는 문제다.

$x$에 $k$번째 함수 $f_k$까지 적용했을 때 함숫값의 범위를 $[l_k,r_k]$라 하자. 각 함수를 적용하면 순서대로 $[l_k+a_{k+1},r_k+a_{k+1}]$, $[\max(l_k,a_{k+1}),r_k]$, $[l_k,\max(r_k,a_{k+1})]$가 될 것이다. 함숫값의 범위와 $x$에 더해지는 offset을 따로 관리한 뒤 마지막 범위 맞게 라운딩하면 된다. 단, $l_k=r_k$가 되는 경우 이전 offset에 관계없이 $x=l_k=r_k$로 고정됨에 유의한다.

```cpp
#include<bits/stdc++.h>
using namespace std;
#define size(v) ((int)v.size())
#define all(v) (v).begin(),(v).end()
using lint = long long;
using fint = long double;
const lint INF = 1e9 + 9;

int n, a[200000], t[200000];
int q, x[200000];

void solve(){
    lint l = -1e9, r = 1e9, d = 0;
    for(int i=0;i<n;++i){
        if(t[i]==1){
            l += a[i];
            r += a[i];
            d += a[i];
        }else if(t[i]==2){
            l = max(l, (lint)a[i]);
            r = max(r, (lint)a[i]);
            if(l==r) d = 0;
        }else if(t[i]==3){
            l = min(l, (lint)a[i]);
            r = min(r, (lint)a[i]);
            if(l==r) d = 0;
        }
    }
    for(int i=0;i<q;++i)
        printf("%lld\n",min(r, max(l, x[i]+d)));
}

int main(){
    scanf("%d",&n);
    for(int i=0;i<n;++i)
        scanf("%d%d",a+i,t+i);
    scanf("%d",&q);
    for(int i=0;i<q;++i)
        scanf("%d",x+i);

    solve();
}
```

### F. Substring 2

다음에 풀어보도록 하자.