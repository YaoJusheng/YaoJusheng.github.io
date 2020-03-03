<div class="copyright">{#
#}{% set current = date(Date.now(), "YYYY") %}{#
#}&copy; {% if theme.footer.since and theme.footer.since != current %}{{ theme.footer.since }} &mdash; {% endif %}{#
#}<span itemprop="copyrightYear">{{ current }}</span>
  <span class="with-love">
    <i class="fa fa-{{ theme.footer.icon }}"></i>
  </span>
  <span class="author" itemprop="copyrightHolder">{{ theme.footer.copyright || config.author }}</span>

  {% if theme.post_wordcount.totalcount %}
    <span class="post-meta-divider">|</span>
    <span class="post-meta-item-icon">
      <i class="fa fa-area-chart"></i>
    </span>
    {% if theme.post_wordcount.item_text %}
      <span class="post-meta-item-text">{{ __('post.totalcount') }}&#58;</span>
    {% endif %}
    <span title="{{ __('post.totalcount') }}">{#
    #}{{ totalcount(site, '0,0.0a') }}{#
  #}</span>
  {% endif %}
</div>

{% if theme.footer.powered %}
  <div class="powered-by">{#
  #}{{ __('footer.powered', '<a class="theme-link" target="_blank" href="https://hexo.io">Hexo</a>') }}{#
#}</div>
{% endif %}

{% if theme.footer.powered and theme.footer.theme.enable %}
  <span class="post-meta-divider">|</span>
{% endif %}

{% if theme.footer.theme.enable %}
  <div class="theme-info">{#
  #}{{ __('footer.theme') }} &mdash; {#
  #}<a class="theme-link" target="_blank" href="https://github.com/iissnan/hexo-theme-next">{#
    #}NexT.{{ theme.scheme }}{#
  #}</a>{% if theme.footer.theme.version %} v{{ theme.version }}{% endif %}{#
#}</div>
{% endif %}

{% if theme.footer.custom_text %}
  <div class="footer-custom">{#
  #}{{ theme.footer.custom_text }}{#
#}</div>
{% endif %}

<br>
  {# 访问统计 #}
  <div class="powered-by" style='color: gray'>
    <i class="fa fa-user-md"></i>
    <span id="busuanzi_container_site_uv">
      本站总访客数:&nbsp;<span id="busuanzi_value_site_uv" style='color: silver'></span>&nbsp;人&nbsp;| 
    </span>
    <i class="fa fa-eye"></i>
    <span id="busuanzi_container_site_pv">
        &nbsp;本站总访问量:&nbsp;<span id="busuanzi_value_site_pv" style='color: silver'></span>&nbsp;次
    </span>
  </div>

<br>
  {# 建站时间 #}
  <div>
    <span id="timeDate" class="color: lightblue;"></span>  
    <span id="times" class="color: lightgreen;"></span>
  </div>

</div>

{# 建站时间 #}
<script>
  var now = new Date(); 
  function createtime() { 
      var grt= new Date("02/12/2020 18:00:00"); 
      now.setTime(now.getTime()+250); 
      days = (now - grt ) / 1000 / 60 / 60 / 24; dnum = Math.floor(days); 
      hours = (now - grt ) / 1000 / 60 / 60 - (24 * dnum); hnum = Math.floor(hours); 
      if(String(hnum).length ==1 ){hnum = "0" + hnum;} minutes = (now - grt ) / 1000 /60 - (24 * 60 * dnum) - (60 * hnum); 
      mnum = Math.floor(minutes); if(String(mnum).length ==1 ){mnum = "0" + mnum;} 
      seconds = (now - grt ) / 1000 - (24 * 60 * 60 * dnum) - (60 * 60 * hnum) - (60 * mnum); 
      snum = Math.round(seconds); if(String(snum).length ==1 ){snum = "0" + snum;} 
      document.getElementById("timeDate").innerHTML = "本站已安全运行 "+dnum+" 天 "; 
      document.getElementById("times").innerHTML = hnum + " 小时 " + mnum + " 分 " + snum + " 秒"; 
  } 
  setInterval("createtime()",250);
</script>