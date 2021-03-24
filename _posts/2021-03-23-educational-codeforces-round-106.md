---
layout: post
title: "Educational Codeforces Round 106"
description: "A~E번까지 업솔빙"
tags: [editorial]
---



### A. Domino on Windowsill

2 x n 그리드가 있는데, 1행의 1~k1열과 2행의 2행의 1~k2열이 흰색, 나머지는 검은색이다. 2x1 모양의 흰색 도미노 w개와 검은색 도미노 b개가 주어질 때, 모든 도미노를 그리드 위의 색상이 같은 위치에 놓을 수 있는지 묻는 문제이다.

min(k1, k2)개의 흰색 도미노를 세로로 먼저 놓으면 나머지 도미노는 가로로 놓는 형태를 생각하면 몇 칸이 필요한지 쉽게 계산할 수 있다. 검은색에 대해서도 확인해주면 된다.

```c++
#include<bits/stdc++.h>
using namespace std;
#define size(v) ((int)v.size())
#define all(v) (v).begin(),(v).end()
using lint = long long;
using fint = long double;
const lint INF = 1e9 + 9;
 
int n, k1, k2, w, b;
 
bool solve(){
  if(k1 > k2) swap(k1,k2);
  int l1 = n-k2;
  int l2 = n-k1;
  w -= k1;
  b -= l1;
  return w+w<=k2-k1 && b+b<=l2-l1;
}
 
int main(){
  int tc = 1; scanf("%d",&tc);
  while(tc--){
    scanf("%d%d%d%d%d",&n,&k1,&k2,&w,&b);
 
    bool ans = solve();
    puts(ans ? "YES" : "NO");
  }
}
```

### B. Binary Removals

어떤 binary string에 대해 서로 인접하지 않은 문자들을 골라 지웠을 때, 정렬된 상태로 만들 수 있는지 묻는 문제다.

binary string이 정렬되어 있다는 것은 어떤 위치를 기준으로 앞은 0, 뒤는 1인 상태를 의미한다. 따라서 모든 위치에 대해 앞에 있는 1, 뒤에 있는 0의 인덱스를 뽑아 연속한지 확인해주었다.

위의 O(N^2)풀이 뿐만 아니라 O(N) 풀이 또한 존재한다. 부분 문자열 00 또는 11은 최소 한 문자 남게된다. 따라서 11이 00보다 먼저 등장한다면 답이 존재하지 않고, 아니면 답이 항상 존재한다.

```c++
#include<bits/stdc++.h>
using namespace std;
#define size(v) ((int)v.size())
#define all(v) (v).begin(),(v).end()
using lint = long long;
using fint = long double;
const lint INF = 1e9 + 9;

char s[101];
 
bool solve(){
  int n = strlen(s);
  for(int m=0;m<=n;++m){
    vector<int> idx;
    for(int i=0;i<m;++i)
      if(s[i]=='1') idx.eb(i);
    for(int i=m;i<n;++i)
      if(s[i]=='0') idx.eb(i);
    bool chk = true;
    for(int i=1;i<(int)idx.size();++i)
      if(idx[i-1]+1==idx[i]) chk = false;
    if(chk) return true;
  } 
  return false;
}
 
int main(){
  int tc = 1; scanf("%d",&tc);
  while(tc--){
    scanf("%s",s);
 
    bool ans = solve();
    puts(ans ? "YES" : "NO");
  }
}
```

### C. Minimum Grid Path

XY평면 위 (0,0)지점에서 (n,n)지점으로 가려고 한다. x축 이나 y축으로만 이동하며 정수 길이로 움직인다. 처음엔 방향을 정하고 매번 방향을 바꿔야 한다. i번째 이동 시 길이 1당 비용 c[i]가 발생한다. 즉, i번째에 length[i]만큼 이동한 경우 총 비용은 c[i]*length[i]이다. 이때 가능한 최소 비용을 묻는 문제이다.

한 방향은 c1, c3, c5, ...의 비용이 생기고 나머지 방향은 c2, c4, c6, ...의 비용이 생긴다. 가로세로를 나눠 생각하면, 길이 n을 k개의 구간으로 적절하게 나누는 문제가 된다. 이는 길이 k인 배열에 c1, ..., ck가 모두 한 번 이상 등장하면서 배열의 합을 최소로 만드는 것과 같다. Greedy하게 접근하여, 각 값을 하나식 채워놓고 남은 곳은 가장 작은 값으로 채워놓으면 된다. 따라서 이 때의 최소 비용은 c1+...+ck+min(c1,...,ck)*(n-k)이다. 이를 모든 k에 대해 반복한다.

```c++
#include<bits/stdc++.h>
using namespace std;
#define size(v) ((int)v.size())
#define all(v) (v).begin(),(v).end()
using lint = long long;
using fint = long double;
const lint INF = 1e9 + 9;

int n, c[100000];

lint solve(){
  lint ret = 1e18;

  lint loc = c[0];
  lint m1 = c[0], m2 = c[1];
  lint c1 = 1, c2 = 0;
  for(int i=1;i<n;++i){
    if(i%2==0) m1 = min(m1,(lint)c[i]), c1++;
    else m2 = min(m2,(lint)c[i]), c2++;
    loc += c[i];
    ret = min(ret, loc + m1 * (n-c1) + m2 * (n-c2));
  } 
  return ret;
} 

int main(){
  int tc = 1; scanf("%d",&tc);
  while(tc--){
    scanf("%d",&n);
    for(int i=0;i<n;++i)
      scanf("%d",c+i);

    lint ans = solve();
    printf("%lld\n",ans);
  }
}
```

### D. The Number of Pairs

양의 정수 $c$, $d$, $x$가 주어졌을 때, $c \cdot lcm(a,b) - d \cdot gcd(a,b) = x$를 만족하는 양의 정수 $(a,b)$쌍의 개수를 구하는 문제이다.

$a=gcd(a,b)\cdot a'$ ,  $b=gcd(a,b)\cdot b'$라고 하면 $lcm(a,b)=gcd(a,b) \cdot a' \cdot b'$이므로 좌변은 $(c \cdot a' \cdot b' - d)*gcd(a,b)$가 되어 $gcd(a,b) \mid x$가 성립한다. 양변을 $gcd(a,b)$로 나눠 식을 전개하면 $a' \cdot b'=\frac{\frac{x}{gcd(a,b)} + d}{c}$가 된다. 따라서 모든 $x$의 약수에 대해, 우변이 정수가 된다면 곱했을 때 이 값이 되는 $(a',b')$쌍의 개수를 세면 된다.

정의에 의해 $a'$과 $b'$은 서로소이므로 같은 소인수를 가질 수 없다. 우변의 소인수 개수가 $p$개라면  $(a',b')$쌍은 $_ {p}\mathrm{C}_{2}$가 된다. 우변의 값은 최대 2e7이므로 에라토스테네스의 체를 이용하여 모든 수의 소인수 개수를 전처리해두면 O(1)에 계산할 수 있다. 이를 모든 $x$의 약수에 대해 반복해야 하므로 각 테스트케이스 당 O(sqrt($x$))가 걸린다. 따라서 전체 시간복잡도 O(2e7loglog(2e7) + t*sqrt(x))에 해결할 수 있다.

에라토스테네스의 체를 전처리하는게 O(NloglogN)임은 알고 있었으나 N = 2e7이라 힘들 것이라 단정하고 계속 고민했다. 결국 대회가 끝나갈 때 쯤 자포자기하는 심정으로 냈는데 이게 정해였다. **앞으로 TLE 예측을 더 여유롭게 해야겠다.**

```c++
#include<bits/stdc++.h>
using namespace std;
#define size(v) ((int)v.size())
#define all(v) (v).begin(),(v).end()
using lint = long long;
using fint = long double;
const lint INF = 1e9 + 9;

int c, d, x;

int p[20000001];

lint solve(){
  lint ret = 0;
  for(int i=1;i*i<=x;++i)
    if(x%i==0){
      if((x/i+d)%c==0)
        ret += 1ll << p[(x/i+d)/c];
      if(i*i!=x && (i+d)%c==0)
        ret += 1ll << p[(i+d)/c];
    }
  return ret;
} 

int main(){
  for(int i=2;i<=20000000;++i)
    if(p[i]==0)
      for(int j=i;j<=20000000;j+=i)
        p[j]++;

  int tc = 1; scanf("%d",&tc);
  while(tc--){
    scanf("%d%d%d",&c,&d,&x);

    lint ans = solve();
    printf("%lld\n",ans);
  }
}
```

### E. Chaotic Merge

다음에 풀어보도록 하자.

### F. Diameter Cuts

이것도 다음에 풀어보자.