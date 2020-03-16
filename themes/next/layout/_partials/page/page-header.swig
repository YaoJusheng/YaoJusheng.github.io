<header class="post-header">
<meta name="google-site-verification" content="Bfnv00rZNhi353c7xG2xhDv6hHH-fMrp45g-eD11bKc" />
<meta name="baidu-site-verification" content="0OflGWGIrN" />
<{%- if theme.seo %}h2{% else %}h1{%- endif %} class="post-title" itemprop="name headline">
  {{- page.title }}
  {{- post_edit(page.source) }}
</{%- if theme.seo %}h2{% else %}h1{%- endif %}>

<div class="post-meta">
  {%- if page.description %}
    <div class="post-description">{{ page.description }}</div>
  {%- endif %}
  {% include '_partials/page/breadcrumb.swig' %}
</div>

</header>
