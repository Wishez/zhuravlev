# -*- coding: utf-8 -*-
from rest_framework import serializers
from blog.models import Article


class ArticlePreviewSerializer(serializers.ModelSerializer):
    tags = serializers.StringRelatedField(many=True)
    class Meta:
        model = Article
        fields = [
            'id',
            'author',
            'title',
            'created_at',
            'announce_text',
            'url',
            'tags'
        ]


class ArticleDetailSerializer(serializers.ModelSerializer):
    tags = serializers.StringRelatedField(many=True)

    class Meta:
        model = Article
        fields = [
            'title',
            'created_at',
            'text',
            'author',
            'tags'
        ]