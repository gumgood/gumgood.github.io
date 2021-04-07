---
layout: post
title: "Codeforces Round 712 (Div.2)"
description: "A~E번까지 업솔빙"
tags: [editorial]
---

### A. Déjà Vu

문자열 s에 문자 `a`를 한 개 추가했을 때, 팰린드롬이 아닌 문자열을 만들 수 있는지 구하고, 구할 수 있다면 아무거나 출력하는 문제다.

양 끝에 대해 `a`를 붙여봤을 때만 확인하면 된다.

```cpp
#include<bits/stdc++.h>
using namespace std;
#define size(v) (int)v.size()
#define all(v) (v).begin(),(v).end()
using lint = long long;
using fint = long double;
const int INF = 1e9 + 9;

char s[300001];

string ans;

bool chk(string &s){
  int n = size(s);
  for(int i=0;i<n;++i)
    if(s[i] != s[n-1-i])
      return false;
  return true;
}

bool solve(){
  int n = strlen(s);
  string ans1 = string(s,s+n) + "a";
  string ans2 = "a" + string(s,s+n);

  if(!chk(ans1))
    return ans = ans1, true;
  if(!chk(ans2))
    return ans = ans2, true;
  return false;
}

int main(){
  int tc; scanf("%d",&tc);
  while(tc--){
    scanf("%s",s);
    bool chk = solve();
    if(!chk) puts("NO");
    else{
      puts("YES");
      puts(ans.c_str());
    }
  }
}
```

### B. Flip the Bits

binary string a가 주어지면 0의 개수와 1의 개수가 같은 prefix를 골라 flip하는 연산을 할 수 있다. 이 연산을 몇 번이든 써서 또 다른 binary string b로 만들 수 있는지 구하는 문제다.

flip연산이므로 적용할 연산끼리 순서가 바뀌어도 결과는 같다. 연산의 범위가 prefix이므로 범위가 큰 연산부터 정해보자. 이렇게 생각하면 뒤부터 a[i]에서 b[i]가 되도록 뒤집어나가면 된다. 연산을 적용할 수 없다면 답이 존재하지 않는 것이다.

구현에서 좀 헤맸는데, prefix의 0과 1의 개수를 전처리한 뒤 짝수 단위로 끊어서 처리했더니 금방 구현할 수 있었다.

```cpp
#include<bits/stdc++.h>
using namespace std;
#define size(v) (int)v.size()
#define all(v) (v).begin(),(v).end()
using lint = long long;
using fint = long double;
const int INF = 1e9 + 9;

int n;
int a[300001];
int b[300001];

int cnt0[300001];
int cnt1[300001];

bool solve(){
  for(int i=1;i<=n;++i)
    cnt0[i] = cnt0[i-1] + (a[i]==0);
  for(int i=1;i<=n;++i)
    cnt1[i] = cnt1[i-1] + (a[i]==1);

  if(n&1) if(a[n] != b[n]) return false;
  n -= n%2;

  int f = 0;
  for(int i=n;i;i-=2){
    if(((a[i]^f) != b[i]) != ((a[i-1]^f) != b[i-1]))
      return false;
    if((a[i]^f)!=b[i]){
      if(cnt0[i] != cnt1[i])
        return false;
      f = f^1;
    }
  }
  return true;
}

int main(){
  int tc; scanf("%d",&tc);
  while(tc--){
    scanf("%d",&n);
    for(int i=1;i<=n;++i)
      scanf("%1d",a+i);
    for(int i=1;i<=n;++i)
      scanf("%1d",b+i);
    bool ans = solve();
    puts(ans ? "YES" : "NO");
  }
}
```

### C. Balance the Bits

길이가 n인 `(` 또는 `)`로 이뤄진 문자열  a, b가 주어졌을 때, 길이가 n인 binary string s의 원소 s[i]는 a[i]=b[i]이면 1, 아니면 0이다. s가 주어졌을 때, 이를 만족하는 a와 b가 있는지, 있다면 아무거나 출력하는 문제다.

올바른 괄호 문자열에 대해 다루는 문제는 **괄호의 높이**로 접근할 수 있다. 높이 0에서 시작하여 `(`이면 +1, `)`이면 -1만큼 변한다고 생각하자. 문자열이 끝날 떄까지 깊이가 한 번도 0 미만으로 내려가지 않고 0에서 끝난다면 이 괄호 문자열은 올바르다는 개념이다. s[i]가 0이면 a, b의 **괄호의 높이**가 각각 +1,-1 또는 -1,1이 된다. s[i]가 1이면 a, b의 괄호의 깊이가 각각 +1,+1 또는 -1,-1이 된다.

Greedy하게 괄호 문자열을 만들어 나갈 수 있다. s[i]가 0인 경우, 높은 쪽을 낮춰주고, 낮을 쪽을 올려준다. s[i]가 1인 경우, 절반은 +1,+1을, 나머지 절반은 -1,-1을 해주면 된다.

C번 치고는 상당히 어려웠다. 솔직히 더 빨리 풀 수 있었는데 너무 느긋했다.

```cpp
#include<bits/stdc++.h>
using namespace std;
#define size(v) (int)v.size()
#define all(v) (v).begin(),(v).end()
using lint = long long;
using fint = long double;
const int INF = 1e9 + 9;

int n, a[200000];

string s1, s2;

bool solve(){
  s1.clear();
  s2.clear();

  int one = accumulate(a,a+n,0);

  int x = 0, y = 0, cnt = 0;
  for(int i=0;i<n;++i){
    int dx = 0, dy = 0;
    if(a[i]){
      if(cnt < one/2) dx++, dy++;
      else dx--, dy--;
      cnt++;
    }else{
      if(x>y) dx--, dy++;
      else dx++, dy--;
    } 
    x += dx, y += dy;
    if(x<0 || y<0)
      return false;
    s1.push_back(dx==1 ? '(' : ')');
    s2.push_back(dy==1 ? '(' : ')');
  }
  return x==0 && y==0;
}

int main(){
  int tc; scanf("%d",&tc);
  while(tc--){
    scanf("%d",&n);
    for(int i=0;i<n;++i)
      scanf("%1d",a+i);
    if(!solve()) puts("NO");
    else{
      puts("YES");
      puts(s1.c_str());
      puts(s2.c_str());
    }
  }
}
```

### D. 3-Coloring

**인터렉티브 문제**다. n x n의 격자판이 있다. 1, 2, 3 중 하나의 수 a가 주어지면 임의의 격자 하나에 a가 아닌 수를 적을 수 있다. 단, 인접한 격자에는 같은 숫자를 쓸 수 없다. a가 주어질 때마다 격자의 위치와 숫자를 출력해서 모든 격자를 채우는 문제다.

기본적인 전략은 체스판 기준으로 검정칸은 1, 하얀칸은 2를 채우는 방법이다. a로 2가 주어지면 1을 채우고, a로 1이 주어지면 2를 채운다. a로 3이 주어지면 아무거나 채우면 된다. 1이 모두 채워져서 남은 칸을 2로 채워야 하는데, a로 2가 주어지면 3을 채우면 된다. 2가 먼저 채워질 때도 마찬가지이다.

체스판 모양으로 채워야겠다는 생각은 했는데, 구체적인 방법을 세우는데 너무 오래걸렸다.

```cpp
#include<bits/stdc++.h>
using namespace std;
#define size(v) (int)v.size()
#define all(v) (v).begin(),(v).end()
using lint = long long;
using fint = long double;
const int INF = 1e9 + 9;

int n, a, x[101][101];

int A, B;

int main(){
  scanf("%d",&n);

  // first;
  scanf("%d",&a);
  if(++a==4) a = 1;
  x[1][1] = a;
  printf("%d %d %d\n",x[1][1],1,1); fflush(stdout);

  //second;
  scanf("%d",&a);
  for(int i=1;i<=3;++i)
    if(x[1][1]!=i && a!=i)
      x[1][2] = i;
  printf("%d %d %d\n",x[1][2],1,2); fflush(stdout);

  int A = x[1][1], B = x[1][2], C;
  for(int i=1;i<=3;++i)
    if(A!=i && B!=i)
      C = i;
  vector<pair<int,int>> va, vb;
  for(int i=1;i<=n;++i)
    for(int j=1;j<=n;++j)
      if(!x[i][j]){
        if((i+j)%2==0) va.emplace_back(i,j);
        else vb.emplace_back(i,j);
      }

  for(int i=3;i<=n*n;++i){
    scanf("%d",&a);
    if(a==A){
      if(!vb.empty()){
        auto [xx, yy] = vb.back(); vb.pop_back();
        x[xx][yy] = B;
        printf("%d %d %d\n",x[xx][yy],xx,yy); fflush(stdout);
      }else{
        auto [xx, yy] = va.back(); va.pop_back();
        x[xx][yy] = C;
        printf("%d %d %d\n",x[xx][yy],xx,yy); fflush(stdout);
      }
    }else if(a==B){
      if(!va.empty()){
        auto [xx, yy] = va.back(); va.pop_back();
        x[xx][yy] = A;
        printf("%d %d %d\n",x[xx][yy],xx,yy); fflush(stdout);
      }
      else{
        auto [xx, yy] = vb.back(); vb.pop_back();
        x[xx][yy] = C;
        printf("%d %d %d\n",x[xx][yy],xx,yy); fflush(stdout);
      }
    }else{
      if(!vb.empty()){
        auto [xx, yy] = vb.back(); vb.pop_back();
        x[xx][yy] = B;
        printf("%d %d %d\n",x[xx][yy],xx,yy); fflush(stdout);
      }else{
        auto [xx, yy] = va.back(); va.pop_back();
        x[xx][yy] = A;
        printf("%d %d %d\n",x[xx][yy],xx,yy); fflush(stdout);
      }
    }
  }
}
```

### E. Travelling Salesman Problem

n개의 도시가 있다. i번 도시의 아름다움 값은 a[i]이다. i번 도시에서 j번 도시로 갈 때, max(c[i], a[j]-a[i])의 비용이 든다. 1번 도시에 출발하여 모든 도시를 정확히 한 번식 방문하고 돌아오는데 드는 최소 비용을 구하는 문제다.

두 가지 풀이가 있는데 재밌어서 모두 소개한다.

첫 번째는 kukul님께서 알려주신 풀이다. 기본적으로 c[i]만큼은 반드시 비용으로 내야하기 떄문에 c[i]들의 합 외에 추가로 내야하는 비용에 초점을 맞추자. a가 큰 곳에서 낮은 곳으로 가는 추가 비용은 0다. 따라서 a[i]가 가장 낮은 곳부터 시작하자. a[i]를 1차원 좌표로 봤을 때, 거리 c[i]만큼 앞으로 이동할 수 있고 뒤로는 얼마든 이동할 수 있다. 앞에 갈 수 있는 좌표가 없을 때는 추가 비용을 내고 가장 가까운 좌표로 이동하면 된다. a[i]를 좌표로 보는 발상을 했다면 [BOJ 20928](icpc.me/20928)와 비슷하게 풀린다. tutorial의 두 번째 방법과 같은 풀이인데, 좌표로 보는 풀이가 더 이해하기 쉬운 것 같다.

두 번째는 다익스트라 풀이다. 그래프를 잘 만들면 최단 경로 알고리즘으로 풀 수 있다. a가 가장 높은 곳에 도달하면 나머지는 내림차순으로 방문하면 된다. 따라서 가장 낮은 곳에서 가장 높은 곳으로 가는 최단 경로를 찾으면 나머지는 내림차순으로 방문하면 된다. 그래프를 만드는 방법은 다음과 같다.

1. a를 오름차순으로 정렬한다.

2. i에서 i-1로 가는 가중치가 0인 간선을 놓는다.

3. a[j]-a[i]-c[i]<=0인 가장 큰 j를 찾고, i에서 j로 가는 가중치가 0인 간선을 놓는다. j는 binary search로 찾을 수 있다.

4. i에서 j+1로 가는 가중치가 max(0, a[j+1]-a[i]-c[i])인 간선을 놓는다.

```cpp
#include<bits/stdc++.h>
using namespace std;
#define size(v) (int)v.size()
#define all(v) (v).begin(),(v).end()
using lint = long long;
using fint = long double;
const int INF = 1e9 + 9;

int n, a[100000], c[100000];

lint solve(){
  vector<pair<int,int>> ac(n);
  for(int i=0;i<n;++i) ac[i] = {a[i], c[i]};
  sort(ac.begin(), ac.end());
  for(int i=0;i<n;++i) a[i] = ac[i].first, c[i] = ac[i].second;

  lint ret = 0;
  int mx = a[0] + c[0];
  for(int s=0;s<n;++s){
    ret += c[s];
    if(mx < a[s]) ret += a[s] - mx;
    mx = max(mx, a[s] + c[s]);
  }
  return ret;
}

int main(){
  scanf("%d",&n);
  for(int i=0;i<n;++i)
    scanf("%d%d",a+i,c+i);
  lint ans = solve();
  printf("%lld",ans);
}
```

### F. Flip the Cards

다음에 풀어보도록 하자.
